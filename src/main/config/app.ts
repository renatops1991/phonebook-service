import { setupMiddleware } from './middleware'
import express, { type Express } from 'express'
import { setupRoutes } from './routes'

export const setupApp = async (): Promise<Express> => {
  const app = express()
  setupMiddleware(app)
  setupRoutes(app)

  return app
}
