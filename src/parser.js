function parseUpdate(update) {
  if (update.message) {
    return {
      type: "message",
      message: update.message,
      raw: update
    }
  }

  if (update.edited_message) {
    return {
      type: "edited_message",
      message: update.edited_message,
      raw: update
    }
  }

  if (update.callback_query) {
    return {
      type: "callback_query",
      callback: update.callback_query,
      raw: update
    }
  }

  if (update.poll_answer) {
    return {
      type: "poll_answer",
      poll: update.poll_answer,
      raw: update
    }
  }

  return {
    type: "unknown",
    raw: update
  }
}

module.exports = parseUpdate
