# Telegram Socket

A lightweight, low-level Telegram Bot API socket inspired by  
**@whiskeysockets/baileys**, built for developers who want **full control**, **extensibility**, and **minimal abstraction**.

Telegram-Socket is designed as a **core engine**, not a framework — flexible enough to build custom bots, automation tools, obfuscation services, or Telegram-based systems.

---

## ✨ Features

- ⚡ Low-level Telegram Bot API wrapper
- 🔌 Socket-style architecture (polling & webhook)
- 🧩 Plugin & command system
- 🧠 Context-based message handling
- 📦 Media support (photo, video, document, contact)
- 🔘 Inline buttons & reply keyboards
- 📊 Polling (Telegram Poll API)
- ✏️ Edit messages
- 🔐 Built-in obfuscator manager (JsConfuser, Terser, etc.)
- ♻️ Hot-reload friendly (fs.watch supported)
- 🪶 Minimal dependencies & clean structure

---

## 📦 Installation

```bash
npm install @xrelly-spec/telegram-socket
```

## 🧑‍💻 Quick Start
```js
"@xrelly-spec/telegram-socke": "github:xrelly-spec/Telegram-Socket"
```

```js
const { makeTelegramSocket } = require("@xrelly-spec/telegram-socket")

const bot = makeTelegramSocket({
  token: process.env.BOT_TOKEN,
  polling: true
})

bot.command("start", async msg => {
  await msg.reply("Hello from Telegram-Socket 👋")
})

bot.start()
```

## 🎯 Philosophy
Telegram-Socket is:
❌ Not a monolithic framework
❌ Not opinionated
✅ A solid foundation for custom Telegram systems
You decide how high-level your bot becomes.
