const JsConfuser = require("js-confuser")

module.exports = async (code, options = {}) => {
  return await JsConfuser.obfuscate(code, {
    target: "node",
    preset: "medium",
    ...options
  })
}
