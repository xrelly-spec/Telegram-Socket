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

    sendVenue(lat, lon, title, address = "", options = {}) {
      return api.call("sendVenue", {
        chat_id: userId,
        latitude: lat,
        longitude: lon,
        title,
        address,
        ...options
      })
    }
  }
}

module.exports = buildPollContext
