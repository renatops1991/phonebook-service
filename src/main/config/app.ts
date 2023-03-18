import express, { type Express } from 'express'

export const setupApp = (): Express => {
  const app = express()

  return app
}
