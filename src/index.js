const TelegramSocket = require("./socket")
const ObfuscatorManager = require("./obfuscator")

function makeTelegramSocket(opts) {
  return new TelegramSocket(opts)
}

const obfuscator = new ObfuscatorManager()

obfuscator.register("jsconfuser", require("./obfuscator/jsconfuser"))
obfuscator.register(
  "javascript-obfuscator",
  require("./obfuscator/javascriptObf")
)
obfuscator.register("terser", require("./obfuscator/terser"))

module.exports = {
  makeTelegramSocket,
  obfuscator,
  ObfuscatorManager
}
