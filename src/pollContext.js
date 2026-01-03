function buildPollContext(api, pollAnswer) {
  const userId = pollAnswer.user.id

  return {
    api,

    pollAnswer,
    user: pollAnswer.user,
    optionIds: pollAnswer.option_ids,

    reply(text, options = {}) {
      return api.sendMessage(userId, text, options)
    },

    sendLocation(lat, lon, options = {}) {
      return api.sendLocation(userId, lat, lon, options)
    },

    sendVenue(lat, lon, title, address = "", options = {}) {
      return api.sendVenue(userId, lat, lon, title, address, options)
    }
  }
}

module.exports = buildPollContext
