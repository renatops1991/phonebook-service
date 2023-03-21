import { setupMiddleware } from './middleware'
import express, { type Express } from 'express'

export const setupApp = (): Express => {
  const app = express()
  setupMiddleware(app)

  return app
}
