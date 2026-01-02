const fetch = require("node-fetch")

class TelegramAPI {
  constructor(token) {
    if (!token) throw new Error("Bot token is required")
    this.base = `https://api.telegram.org/bot${token}`
  }

  async call(method, params = {}) {
    const res = await fetch(`${this.base}/${method}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    })

    const json = await res.json()
    if (!json.ok) {
      throw new Error(json.description || "Telegram API error")
    }

    return json.result
  }
  
  sendMessage(chat_id, text, options = {}) {
    return this.call("sendMessage", {
      chat_id,
      text,
      ...options
    })
  }

  editMessageText(chat_id, message_id, text, options = {}) {
    return this.call("editMessageText", {
      chat_id,
      message_id,
      text,
      ...options
    })
  }

  sendPhoto(chat_id, photo, caption = "", options = {}) {
    return this.call("sendPhoto", {
      chat_id,
      photo,
      caption,
      ...options
    })
  }

  sendVideo(chat_id, video, caption = "", options = {}) {
    return this.call("sendVideo", {
      chat_id,
      video,
      caption,
      ...options
    })
  }

  sendDocument(chat_id, document, caption = "", options = {}) {
    return this.call("sendDocument", {
      chat_id,
      document,
      caption,
      ...options
    })
  }

  sendContact(chat_id, phone_number, first_name, options = {}) {
    return this.call("sendContact", {
      chat_id,
      phone_number,
      first_name,
      ...options
    })
  }
}

module.exports = TelegramAPI
