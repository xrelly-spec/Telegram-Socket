const TelegramSocket = require("./socket")

module.exports = {
  makeTelegramSocket: opts => new TelegramSocket(opts)
}