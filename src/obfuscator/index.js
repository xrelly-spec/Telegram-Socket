class ObfuscatorManager {
  constructor() {
    this.engines = new Map()
  }

  /**
   * Register obfuscator engine
   * engine can be:
   * - function(code, options)
   * - object with obfuscate()
   * - class with obfuscate()
   */
  register(name, engine) {
    if (!name || !engine)
      throw new Error("Invalid obfuscator registration")

    this.engines.set(name.toLowerCase(), engine)
  }

  has(name) {
    return this.engines.has(name?.toLowerCase())
  }

  list() {
    return [...this.engines.keys()]
  }

  get(name) {
    return this.engines.get(name?.toLowerCase())
  }

  /**
   * Normalize engine call
   */
  async _runEngine(engine, code, options) {
    if (typeof engine === "function") {
      return await engine(code, options)
    }
    
    if (typeof engine.obfuscate === "function") {
      return await engine.obfuscate(code, options)
    }

    throw new Error("Invalid obfuscator engine interface")
  }

  /**
   * Main obfuscate method
   */
  async obfuscate(name, code, options = {}) {
    if (!name)
      throw new Error("Obfuscator engine name is required")

    if (!code || typeof code !== "string")
      throw new Error("Invalid JavaScript code")

    const engine = this.get(name)

    if (!engine)
      throw new Error(
        "Engine not found: " +
        name +
        "\nAvailable: " +
        this.list().join(", ")
      )

    try {
      const result = await this._runEngine(engine, code, options)

      if (typeof result === "string") return result
      if (result?.code) return result.code

      throw new Error("Invalid obfuscator output")
    } catch (err) {
      throw new Error(
        `[${name}] Obfuscation failed: ${err.message}`
      )
    }
  }
}

module.exports = ObfuscatorManager
