import { bodyParse } from '../middlewares/body-parse'
import { Express } from 'express'
export const setupMiddleware = (app: Express): void => {
  app.use(bodyParse)
}
