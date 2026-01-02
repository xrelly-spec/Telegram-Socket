const terser = require("terser")

module.exports = {
  async obfuscate(code, options = {}) {
    const result = await terser.minify(code, options)
    return result.code
  }
}
