export enum Actor {
  SYSTEM = 'system',
  USER = 'user',
  BOT = 'bot',
  COMMENTER = 'commenter',
}

export enum ActionType {
  MESSAGE = 'message',
  DELETE = 'delete',
  FEEDBACK = 'feedback',
  REGENERATE = 'regenerate',
  EDIT = 'edit',
}

export enum InputType {
  CHAT = 'chat',
  MARKDOWN = 'markdown',
}
