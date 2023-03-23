import { setupMiddleware } from './middleware'
import express, { type Express } from 'express'
import { setupRoutes } from './routes'
import { setupSwagger } from './swagger'

export const setupApp = async (): Promise<Express> => {
  const app = express()
  setupSwagger(app)
  setupMiddleware(app)
  setupRoutes(app)

  return app
}
