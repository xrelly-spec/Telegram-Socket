function buildCallbackContext(api, cb) {
  const msg = cb.message || null

  const chatId =
    msg?.chat?.id ||
    cb.from?.id

  const messageId =
    msg?.message_id

  const ctx = {
    id: cb.id,
    data: cb.data,
    from: cb.from,
    message: msg,
    chat: msg?.chat || null,
    api
  }

  ctx.answer = (text = "", options = {}) =>
    api.call("answerCallbackQuery", {
      callback_query_id: cb.id,
      text,
      ...options
    })

  ctx.reply = (text, options = {}) => {
    if (!chatId) throw new Error("chatId not found")
    return api.sendMessage(chatId, text, options)
  }

  ctx.edit = (text, options = {}) => {
    if (!chatId || !messageId)
      throw new Error("Cannot edit message (no message context)")

    return api.editMessageText(chatId, messageId, text, options)
  }

  ctx.sendPhoto = (photo, caption = "", options = {}) =>
    api.sendPhoto(chatId, photo, caption, options)

  ctx.sendVideo = (video, caption = "", options = {}) =>
    api.sendVideo(chatId, video, caption, options)

  ctx.sendDocument = (document, caption = "", options = {}) =>
    api.sendDocument(chatId, document, caption, options)

  ctx.sendButtons = (text, buttons, options = {}) =>
    api.sendMessage(chatId, text, {
      reply_markup: { inline_keyboard: buttons },
      ...options
    })

  ctx.sendVenue = (
    latitude,
    longitude,
    title,
    address = "",
    options = {}
  ) =>
    api.call("sendVenue", {
      chat_id: chatId,
      latitude,
      longitude,
      title,
      address,
      ...options
    })

  return ctx
}

module.exports = buildCallbackContext
