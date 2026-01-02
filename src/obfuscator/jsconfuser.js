const JsConfuser = require("js-confuser")

module.exports = {
  async obfuscate(code, options = {}) {
    return JsConfuser.obfuscate(code, {
      target: "node",
      controlFlowFlattening: true,
      stringEncoding: true,
      deadCode: true,
      ...options
    })
  }
}
