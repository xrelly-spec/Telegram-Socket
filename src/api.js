const fetch = require("node-fetch")

class TelegramAPI {
  constructor(token) {
    if (!token) throw new Error("Bot token is required")
    this.baseURL = `https://api.telegram.org/bot${token}`
  }

  async call(method, data = {}) {
    const res = await fetch(`${this.baseURL}/${method}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    })

    const json = await res.json()
    if (!json.ok) throw json
    return json.result
  }

  sendMessage(chat_id, text, options = {}) {
    return this.call("sendMessage", {
      chat_id,
      text,
      ...options
    })
  }
}

module.exports = TelegramAPI