function buildContext(api, msg) {
  msg.reply = (text, options = {}) =>
    api.sendMessage(msg.chat.id, text, {
      reply_to_message_id: msg.message_id,
      ...options
    })

  return msg
}

module.exports = buildContext