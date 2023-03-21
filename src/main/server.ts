import { MongoHelper } from '@/infra/mongodb/mongo-helper'
import dotenv from 'dotenv'
import { Express } from 'express'

dotenv.config()
MongoHelper.connect(process.env.MONGODB_URI as string)
  .then(async () => {
    const { setupApp } = await import('./config/app')
    const app: Express = setupApp()
    app.listen(process.env.PORT,
      () => {
        console.log(`${String.fromCodePoint(0x1F525)} Server is running on port ${process.env.PORT}`)
      }
    )
  }).catch(console.error)
