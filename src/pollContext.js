function buildPollContext(api, pollAnswer) {
  const userId = pollAnswer.user?.id

  if (!userId)
    throw new Error("PollAnswer without user id")

  const ctx = {
    api,

    pollAnswer,
    user: pollAnswer.user,
    optionIds: pollAnswer.option_ids,

    reply(text, options = {}) {
      return api.sendMessage(userId, text, options)
    },

    sendPhoto(photo, caption = "", options = {}) {
      return api.sendPhoto(userId, photo, caption, options)
    },

    sendVideo(video, caption = "", options = {}) {
      return api.sendVideo(userId, video, caption, options)
    },

    sendDocument(document, caption = "", options = {}) {
      return api.sendDocument(userId, document, caption, options)
    },

    sendButtons(text, buttons, options = {}) {
      return api.sendMessage(userId, text, {
        reply_markup: { inline_keyboard: buttons },
        ...options
      })
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

  return ctx
}

module.exports = buildPollContext
