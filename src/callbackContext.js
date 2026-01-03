function buildCallbackContext(api, cb) {
  const msg = cb.message

  const ctx = {
    id: cb.id,
    data: cb.data,

    from: cb.from,
    message: msg,
    chat: msg.chat,

    answer(text = "", options = {}) {
      return api.call("answerCallbackQuery", {
        callback_query_id: cb.id,
        text,
        ...options
      })
    },

    edit(text, options = {}) {
      return api.editMessageText(
        msg.chat.id,
        msg.message_id,
        text,
        options
      )
    }
  }

  return ctx
}

module.exports = buildCallbackContext
