const TelegramAPI = require("./api")
const BotEvents = require("./events")
const parseUpdate = require("./parser")
const buildContext = require("./context")
const PluginManager = require("./plugin")
const CommandHandler = require("./command")
const { delay, backoff } = require("./utils")
const logger = require("./logger")

class TelegramSocket {
  constructor({ token, polling = true, webhook = null, prefix = "/" }) {
    this.api = new TelegramAPI(token)
    this.events = new BotEvents()
    this.plugins = new PluginManager(this)
    this.commands = new CommandHandler(prefix)

    this.polling = polling
    this.webhook = webhook
    this.offset = 0
    this.running = false
    this.retry = 0
  }

  use(plugin) {
    this.plugins.use(plugin)
  }

  command(cmd, handler) {
    this.commands.register(cmd, handler)
  }

  async start() {
    this.running = true
    logger.info("TelegramSocket started")

    if (this.webhook) return this._startWebhook()
    if (this.polling) this._poll()
  }

  async _handleUpdate(update) {
    const parsed = parseUpdate(update)
    if (!parsed.message) return

    // ✅ BUILD CONTEXT
    const ctx = buildContext(this.api, parsed.message, this)

    try {
      // ✅ PLUGIN PIPELINE
      await this.plugins.run(ctx)

      // ✅ COMMAND HANDLER (CTX BASED)
      await this.commands.handle(ctx)
    } catch (err) {
      logger.error("Handler error", err)
    }

    this.events.emitUpdate(parsed.raw)
  }

  async _poll() {
    while (this.running) {
      try {
        const updates = await this.api.call("getUpdates", {
          offset: this.offset,
          timeout: 30
        })

        for (const upd of updates) {
          this.offset = upd.update_id + 1
          await this._handleUpdate(upd)
        }

        this.retry = 0
      } catch (err) {
        this.retry++
        logger.error("Polling error", err)
        await delay(backoff(this.retry))
      }
    }
  }

  _startWebhook() {
    const http = require("http")

    http
      .createServer(async (req, res) => {
        try {
          let body = ""
          req.on("data", c => (body += c))
          req.on("end", async () => {
            const update = JSON.parse(body)
            await this._handleUpdate(update)
            res.end("OK")
          })
        } catch (err) {
          logger.error("Webhook error", err)
          res.statusCode = 500
          res.end("ERROR")
        }
      })
      .listen(this.webhook.port)

    logger.info("Webhook listening on", this.webhook.port)
  }
}

module.exports = TelegramSocket
