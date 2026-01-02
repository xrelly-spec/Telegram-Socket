class PluginManager {
  constructor(sock) {
    this.sock = sock
  }

  use(plugin) {
    if (typeof plugin !== "function")
      throw new Error("Plugin must be a function")

    plugin(this.sock)
  }
}

module.exports = PluginManager