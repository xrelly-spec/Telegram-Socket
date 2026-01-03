function buildPollContext(api, pollAnswer) {
  const user = pollAnswer.user || {}
  const userId = user.id

  return {
    api,
    pollAnswer,

    user,
    option_ids: Array.isArray(pollAnswer.option_ids)
      ? pollAnswer.option_ids
      : [],
    
    reply(text, options = {}) {
      if (!userId) return
      return api.sendMessage(userId, text, options)
    }
  }
}

module.exports = buildPollContext
