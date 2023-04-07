import { AxiosAdapter } from '@/infra/http/axios-adapter'
import { fixtureHttpAxiosResponse, httpAxiosRequestStub } from '@/tests/fixtures/fixtures-http'
import axios from 'axios'

jest.mock('axios', () => {
  return {
    create: jest.fn(() => httpAxiosRequestStub),
    read: jest.fn(() => httpAxiosRequestStub)
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

    it('Should throw error if post method throw exception error', async () => {
      jest.spyOn(httpAxiosStub, 'post').mockImplementationOnce(() => { throw new Error() })
      const expectedResponse = sut.create(url, body, { apiKey: 'foo' })
      await expect(expectedResponse).rejects.toThrow()
    })
  })

  describe('Read', () => {
    const url = '/v1/order/read/email'
    it('Should call get method of the axios client with corrects values', async () => {
      const readSpy = jest.spyOn(httpAxiosStub, 'get')
      await sut.read(url, { apiKey: 'foo' })
      expect(readSpy).toHaveBeenCalledWith(url, { apiKey: 'foo' })
    })

    it('Should return response data correctly if get method on succeeds', async () => {
      jest.spyOn(httpAxiosStub, 'get')
      const expectedResponse = await sut.read(url, { apiKey: 'foo' })
      expect(expectedResponse).toEqual(fixtureHttpAxiosResponse(200))
    })
  })
})
