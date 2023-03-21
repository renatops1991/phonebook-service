import { setupApp } from '@/main/config/app'
import { Express } from 'express'
import request from 'supertest'

let app: Express
describe('BodyParse Middleware', () => {
  beforeAll(async () => {
    app = await setupApp()
  })
  it('Should correct parse as json', async () => {
    app.post('/body-parse', (request, response) => {
      response.send(request.body)
    })
    await request(app)
      .post('/body-parse')
      .send({ name: 'foo' })
      .expect({ name: 'foo' })
  })
})
