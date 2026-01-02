const axios = require("axios")

module.exports = {
  async obfuscate(code, options) {
    const { apiKey, applicationId } = options

    if (!apiKey || !applicationId)
      throw new Error("Jscrambler credentials required")

    const res = await axios.post(
      "https://api.jscrambler.com/code.json",
      {
        sources: [{ filename: "input.js", content: code }],
        params: options.params || []
      },
      {
        headers: {
          "x-jscrambler-key": apiKey,
          "x-jscrambler-app-id": applicationId
        }
      }
    )

    return res.data[0].content
  }
}
