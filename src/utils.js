function delay(ms) {
  return new Promise(r => setTimeout(r, ms))
}

function backoff(attempt) {
  return Math.min(30000, 1000 * 2 ** attempt)
}

module.exports = { delay, backoff }