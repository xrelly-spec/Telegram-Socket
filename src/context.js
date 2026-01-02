function buildContext(api, msg, socket) {
  const text = msg.text || ""

  const ctx = {
    api,
    socket,

    message: msg,

    chat: msg.chat,
    from: msg.from,
    text,
    args: text.split(" ").slice(1),
    isGroup: msg.chat?.type !== "private",

    reply(text, options = {}) {
      return api.call("sendMessage", {
        chat_id: msg.chat.id,
        text,
        reply_to_message_id: msg.message_id,
        ...options
      })
    }
  }

  return ctx
}

module.exports = buildContext
