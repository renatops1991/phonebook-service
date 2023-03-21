import { setupApp } from '@/main/config/app'
import { Express, Response } from 'express'
import request from 'supertest'

let app: Express

describe('ContentType Middleware', () => {
  beforeAll(() => {
    app = setupApp()
  })
  it('Should return default content type as json', async () => {
    app.get('/content-type', (_, response: Response) => {
      response.send('')
    })
    await request(app)
      .get('/content-type')
      .expect('content-type', /json/)
  })

  it('Should return default content type as xml', async () => {
    app.get('/content-type', (_, response: Response) => {
      response.type('xml')
      response.send('')
    })
    await request(app)
      .get('/content-type')
      .expect('content-type', /xml/)
  })
})
