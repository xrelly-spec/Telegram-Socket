class Context {
  constructor({ bot, update, message }) {
    this.bot = bot
    this.update = update
    this.message = message

    this.chat = message.chat
    this.from = message.from
    this.text = message.text || ""

    this.args = this.text.split(" ").slice(1)
    this.isGroup = this.chat?.type !== "private"
  }

  reply(text, opts = {}) {
    return this.bot.sendMessage(this.chat.id, text, opts)
  }
}

module.exports = Context
