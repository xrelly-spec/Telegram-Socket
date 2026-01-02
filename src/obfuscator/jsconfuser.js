const JsConfuser = require("jsconfuser")

module.exports = async (code, options = {}) => {
  return await JsConfuser.obfuscate(code, {
    target: "node",
    preset: "medium",
    ...options
  })
}
