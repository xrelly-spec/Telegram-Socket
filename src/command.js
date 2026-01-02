class CommandHandler {
  constructor(prefix = "/") {
    this.prefix = prefix
    this.commands = new Map()
  }

  register(cmd, handler) {
    this.commands.set(cmd, handler)
  }

  async handle(msg) {
    if (!msg.text?.startsWith(this.prefix)) return
    const [cmd, ...args] = msg.text
      .slice(this.prefix.length)
      .split(" ")

    if (this.commands.has(cmd)) {
      await this.commands.get(cmd)(msg, args)
    }
  }
}

module.exports = CommandHandler