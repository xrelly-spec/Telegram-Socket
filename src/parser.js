function parseUpdate(update) {
  return {
    updateId: update.update_id,
    message: update.message || null,
    callback: update.callback_query || null,
    raw: update
  }
}

module.exports = parseUpdate