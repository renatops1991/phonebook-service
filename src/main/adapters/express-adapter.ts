import { IController } from '@/presentation/protocols/controller'
import { RequestHandler, Request, Response } from 'express'

export const expressAdapter = (controller: IController): RequestHandler =>
  async (request: Request, response: Response) => {
    const httpRequest = {
      ...(request.body || {}),
      ...(request.query || {})
    }

    const httpResponse = await controller.handle(httpRequest)

    for (const successStatusCode of [200, 201, 204]) {
      if (httpResponse.statusCode === successStatusCode) {
        return response.status(httpResponse.statusCode).json(httpResponse.body)
      }
    }

    return response.status(httpResponse.statusCode).json({
      error: httpResponse.body
    })
  }
