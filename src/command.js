class CommandHandler {
  constructor(prefix = ["/", "."]) {
    this.prefixes = Array.isArray(prefix) ? prefix : [prefix]
    this.commands = new Map()
  }

  register(cmd, handler) {
    this.commands.set(cmd, handler)
  }

  async handle(sock, msg) {
    if (!msg || !msg.text) return

    const text = msg.text.trim()
    if (!text) return

    let command = null
    let args = []

    for (const p of this.prefixes) {
      if (text.startsWith(p)) {
        const parts = text.slice(p.length).trim().split(/\s+/)
        command = parts.shift()?.toLowerCase()
        args = parts
        break
      }
    }
    
    if (!command) {
      const parts = text.split(/\s+/)
      if (this.commands.has(parts[0].toLowerCase())) {
        command = parts.shift().toLowerCase()
        args = parts
      }
    }

    if (!command) return

    const handler = this.commands.get(command)
    if (!handler) return

    await handler(sock, msg, args)
  }
}

module.exports = CommandHandler
