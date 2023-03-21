import { setupApp } from '@/main/config/app'
import { Express } from 'express'
import request from 'supertest'

let app: Express
describe('Cors Middleware', () => {
  beforeAll(async () => {
    app = await setupApp()
  })
  it('Should enabled Cors', async () => {
    app.get('/cors', (request, response) => {
      response.send()
    })
    await request(app)
      .get('/cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
