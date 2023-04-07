import { AxiosAdapter } from '@/infra/http/axios-adapter'
import { fixtureHttpAxiosResponse, httpAxiosRequestStub } from '@/tests/fixtures/fixtures-http'
import axios from 'axios'

jest.mock('axios', () => {
  return {
    create: jest.fn(() => httpAxiosRequestStub),
    read: jest.fn(() => httpAxiosRequestStub),
    update: jest.fn(() => httpAxiosRequestStub),
    delete: jest.fn(() => httpAxiosRequestStub)
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

    it('Should throw error if get method throw exception error', async () => {
      jest.spyOn(httpAxiosStub, 'get').mockImplementationOnce(() => { throw new Error() })
      const expectedResponse = sut.read(url, { apiKey: 'foo' })
      await expect(expectedResponse).rejects.toThrow()
    })
  })

  describe('Update', () => {
    const url = '/v1/order/update/email'
    const body = { name: 'foo' }
    it('Should call put method of the axios client with corrects values', async () => {
      const updateSpy = jest.spyOn(httpAxiosStub, 'put')
      await sut.update(url, body, { apiKey: 'foo' })
      expect(updateSpy).toHaveBeenCalledWith(url, body, { apiKey: 'foo' })
    })

    it('Should return response data correctly if put method on succeeds', async () => {
      jest.spyOn(httpAxiosStub, 'put')
      const expectedResponse = await sut.create(url, body, { apiKey: 'foo' })
      expect(expectedResponse).toEqual(fixtureHttpAxiosResponse(200))
    })

    it('Should throw error if get method throw exception error', async () => {
      jest.spyOn(httpAxiosStub, 'put').mockImplementationOnce(() => { throw new Error() })
      const expectedResponse = sut.update(url, body, { apiKey: 'foo' })
      await expect(expectedResponse).rejects.toThrow()
    })
  })

  describe('Delete', () => {
    const url = '/v1/order/delete/email'
    it('Should call delete method of the axios client with corrects values', async () => {
      const deleteSpy = jest.spyOn(httpAxiosStub, 'delete')
      await sut.delete(url, { apiKey: 'foo' })
      expect(deleteSpy).toHaveBeenCalledWith(url, { apiKey: 'foo' })
    })

    it('Should return response data correctly if delete method on succeeds', async () => {
      jest.spyOn(httpAxiosStub, 'delete')
      const expectedResponse = await sut.delete(url, { apiKey: 'foo' })
      expect(expectedResponse).toEqual(Object.assign(fixtureHttpAxiosResponse(200), { data: {} }))
    })

    it('Should throw error if delete method throw exception error', async () => {
      jest.spyOn(httpAxiosStub, 'delete').mockImplementationOnce(() => { throw new Error() })
      const expectedResponse = sut.delete(url, { apiKey: 'foo' })
      await expect(expectedResponse).rejects.toThrow()
    })
  })
})
