function buildContext(api, msg) {
  msg.reply = (text, options = {}) =>
    api.sendMessage(msg.chat.id, text, {
      reply_to_message_id: msg.message_id,
      ...options
    })

  msg.edit = (text, options = {}) =>
    api.editMessageText(msg.chat.id, msg.message_id, text, options)

  msg.sendPhoto = (photo, caption = "", options = {}) =>
    api.sendPhoto(msg.chat.id, photo, caption, options)
  
  msg.sendVideo = (video, caption = "", options = {}) =>
    api.sendVideo(msg.chat.id, video, caption, options)

  msg.sendDocument = (document, caption = "", options = {}) =>
    api.sendDocument(msg.chat.id, document, caption, options)

  msg.sendContact = (phone, firstName, options = {}) =>
    api.sendContact(msg.chat.id, phone, firstName, options)

  return msg
}

module.exports = buildContext
