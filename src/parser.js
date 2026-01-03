function parseUpdate(update) {
  const parsed = {
    updateId: update.update_id,
    type: null,
    message: null,
    callback: null,
    poll: null,
    raw: update
  }

  if (update.message) {
    parsed.type = "message"
    parsed.message = update.message
    return parsed
  }

  if (update.callback_query) {
    parsed.type = "callback_query"
    parsed.callback = update.callback_query
    return parsed
  }

  if (update.poll_answer) {
    parsed.type = "poll_answer"
    parsed.poll = update.poll_answer
    return parsed
  }

  if (update.edited_message) {
    parsed.type = "edited_message"
    parsed.message = update.edited_message
    return parsed
  }

  return parsed
}

module.exports = parseUpdate
