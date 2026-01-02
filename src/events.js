const { EventEmitter } = require("events")

class BotEvents extends EventEmitter {
  emitUpdate(update) {
    this.emit("update", update)

    if (update.message) {
      this.emit("message", update.message)

      if (update.message.text) {
        this.emit("text", update.message)
      }
    }

    if (update.callback_query) {
      this.emit("callback", update.callback_query)
    }
  }
}

module.exports = BotEvents