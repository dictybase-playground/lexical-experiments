import { createCommand } from "lexical"

export type InsertImagePayload = {
  source: string
  key?: string
}

export const INSERT_IMAGE_COMMAND = createCommand<InsertImagePayload>()
