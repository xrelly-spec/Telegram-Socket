const JavaScriptObfuscator = require("javascript-obfuscator")

module.exports = {
  async obfuscate(code, options = {}) {
    const result = JavaScriptObfuscator.obfuscate(code, {
      compact: true,
      controlFlowFlattening: true,
      ...options
    })
    return result.getObfuscatedCode()
  }
}
