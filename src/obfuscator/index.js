class ObfuscatorManager {
  constructor() {
    this.engines = new Map()
  }

  register(name, engine) {
    this.engines.set(name, engine)
  }

  has(name) {
    return this.engines.has(name)
  }

  list() {
    return [...this.engines.keys()]
  }

  async obfuscate(name, code, options = {}) {
    if (!this.engines.has(name))
      throw new Error("Engine not found: " + name)

    const engine = this.engines.get(name)

    if (typeof engine !== "function")
      throw new Error("Invalid obfuscator engine")

    return await engine(code, options)
  }
}

module.exports = ObfuscatorManager
