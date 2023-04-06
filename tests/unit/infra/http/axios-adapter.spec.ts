import { AxiosAdapter } from '@/infra/http/axios-adapter'
import { fixtureHttpAxiosResponse, httpAxiosRequestStub } from '@/tests/fixtures/fixtures-http'
import axios from 'axios'

jest.mock('axios', () => {
  return {
    create: jest.fn(() => httpAxiosRequestStub)
  }
})
const config = {
  baseURL: 'http://localhost'
}
const httpAxiosStub = axios.create(config)
const sut = new AxiosAdapter(config)

describe('AxiosAdapter', () => {
  describe('Create', () => {
    const url = '/v1/order/create'
    const body = { name: 'foo' }
    it('Should call post method of the axios client with corrects values', async () => {
      const postSpy = jest.spyOn(httpAxiosStub, 'post')
      await sut.create(url, body, { apiKey: 'foo' })
      expect(postSpy).toHaveBeenCalledWith(url, body, { apiKey: 'foo' })
    })

    it('Should return response data correctly if post method on succeeds', async () => {
      jest.spyOn(httpAxiosStub, 'post')
      const expectedResponse = await sut.create(url, body, { apiKey: 'foo' })
      expect(expectedResponse).toEqual(fixtureHttpAxiosResponse(200))
    })
  })
})
