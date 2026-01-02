class ObfuscatorManager {
  constructor() {
    this.engines = new Map()
  }

  register(name, engine) {
    if (typeof engine.obfuscate !== "function") {
      throw new Error("Invalid obfuscator engine")
    }
    this.engines.set(name.toLowerCase(), engine)
  }

  async obfuscate(name, code, options = {}) {
    const engine = this.engines.get(name.toLowerCase())
    if (!engine) {
      throw new Error(`Obfuscator '${name}' not found`)
    }
    return engine.obfuscate(code, options)
  }

  list() {
    return [...this.engines.keys()]
  }
}

module.exports = ObfuscatorManager
