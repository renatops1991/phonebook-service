import { setupApp } from '@/main/config/app'
import { noCache } from '@/main/middlewares/no-cache'
import { Express, Response } from 'express'
import request from 'supertest'

let app: Express

describe('noCache', () => {
  beforeAll(async () => {
    app = await setupApp()
  })
  it('Should disable cache', async () => {
    app.get('/no-cache', noCache, (_, response: Response) => {
      response.send()
    })
    await request(app)
      .get('/no-cache')
      .expect('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
      .expect('surrogate-control', 'no-store')
  })
})
