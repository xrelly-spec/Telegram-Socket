export function makeTelegramSocket(options: {
  token: string
  polling?: boolean
  webhook?: { port: number }
  prefix?: string
}): TelegramSocket

export interface TelegramSocket {
  api: any
  events: any
  use(plugin: Function): void
  command(cmd: string, handler: Function): void
  start(): void
}