const Context = require("./context")

module.exports = function dispatch(bot, handlers) {
  bot.on("message", update => {
    const message = update.message
    if (!message || !message.text) return

    const ctx = new Context({
      bot,
      update,
      message
    })

    const cmd = ctx.text.split(" ")[0].replace("/", "")

    if (handlers.commands.has(cmd)) {
      try {
        handlers.commands.get(cmd)(ctx)
      } catch (e) {
        console.error("[COMMAND ERROR]", e)
      }
    }
  })
}
