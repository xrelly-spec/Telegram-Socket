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

  sendButtons(chat_id, text, buttons, options = {}) {
    return this.call("sendMessage", {
      chat_id,
      text,
      reply_markup: {
        inline_keyboard: buttons
      },
      ...options
    })
  }

  sendReplyKeyboard(chat_id, text, keyboard, options = {}) {
    return this.call("sendMessage", {
      chat_id,
      text,
      reply_markup: {
        keyboard,
        resize_keyboard: true,
        one_time_keyboard: false
      },
      ...options
    })
  }

  removeKeyboard(chat_id, text = "Keyboard removed", options = {}) {
    return this.call("sendMessage", {
      chat_id,
      text,
      reply_markup: {
        remove_keyboard: true
      },
      ...options
    })
  }

  sendPoll(chat_id, question, optionsList = [], options = {}) {
    return this.call("sendPoll", {
      chat_id,
      question,
      options: optionsList,
      ...options
    })
  }

 sendLocation(chat_id, latitude, longitude, options = {}) {
  return this.call("sendLocation", {
    chat_id,
    latitude,
    longitude,
    ...options
  })
}

sendVenue(chat_id, latitude, longitude, title, address = "", options = {}) {
  return this.call("sendVenue", {
    chat_id,
    latitude,
    longitude,
    title,
    address,
    ...options
  })
}}


module.exports = TelegramAPI
