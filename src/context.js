function buildContext(api, msg) {
  const chatId = msg.chat?.id
  const messageId = msg.message_id

  msg.api = api

  msg.reply = (text, options = {}) =>
    api.sendMessage(chatId, text, {
      reply_to_message_id: messageId,
      ...options
    })

  msg.edit = (text, options = {}) =>
    api.editMessageText(chatId, messageId, text, options)

  msg.sendPhoto = (photo, caption = "", options = {}) =>
    api.sendPhoto(chatId, photo, caption, options)

  msg.sendVideo = (video, caption = "", options = {}) =>
    api.sendVideo(chatId, video, caption, options)

  msg.sendDocument = (document, caption = "", options = {}) =>
    api.sendDocument(chatId, document, caption, options)

  msg.sendContact = (phone, firstName, options = {}) =>
    api.sendContact(chatId, phone, firstName, options)

  msg.sendButtons = (text, buttons, options = {}) =>
    api.sendMessage(chatId, text, {
      reply_markup: { inline_keyboard: buttons },
      ...options
    })

  msg.sendKeyboard = (text, keyboard, options = {}) =>
    api.sendMessage(chatId, text, {
      reply_markup: {
        keyboard,
        resize_keyboard: true,
        one_time_keyboard: false
      },
      ...options
    })

  msg.removeKeyboard = (text = "Keyboard removed", options = {}) =>
    api.sendMessage(chatId, text, {
      reply_markup: { remove_keyboard: true },
      ...options
    })

  msg.sendPoll = (question, optionsList = [], options = {}) =>
    api.sendPoll(chatId, question, optionsList, options)

  return msg
}

module.exports = buildContext
