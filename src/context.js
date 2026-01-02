function buildContext(api, msg, socket) {
  const rawText = msg.text || ""
  const text = rawText.trim()

  const parts = text.split(/\s+/)

  const command =
    parts[0]?.startsWith("/")
      ? parts[0].slice(1)
      : null

  const args = command ? parts.slice(1) : []

  const ctx = {
    api,
    socket,

    message: msg,

    chat: msg.chat,
    from: msg.from,

    text: rawText,
    command,
    args,

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
