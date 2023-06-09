import { bodyParse } from '../middlewares/body-parse'
import { Express } from 'express'
import { cors } from '../middlewares/cors'
import { contentType } from '../middlewares/context-type'

export const setupMiddleware = (app: Express): void => {
  app.use(bodyParse)
  app.use(cors)
  app.use(contentType)
}
