import { AxiosAdapter } from '@/infra/http/axios-adapter'
import axios from 'axios'

jest.mock('axios', () => {
  const httpAxiosRequestStub = {
    post: jest.fn().mockReturnValue({
      status: 200,
      headers: {
        apiKey: 'foo'
      },
      data: { response: { name: 'foo' } }
    })
  }

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
  })
})
