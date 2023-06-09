import { HttpResponseType } from '@/data/types/http-types'

export const fixtureHttpAxiosResponse = (status: number): HttpResponseType => ({
  status,
  headers: {
    api: 'foo',
    'content-type': 'application/json'
  },
  data: {
    name: 'foo'
  }
})

export const httpAxiosRequestStub = {
  post: jest.fn().mockReturnValue({
    status: 200,
    headers: {
      api: 'foo',
      'content-type': 'application/json'
    },
    data: { name: 'foo' }
  }),
  get: jest.fn().mockReturnValue({
    status: 200,
    headers: {
      api: 'foo',
      'content-type': 'application/json'
    },
    data: { name: 'foo' }
  }),
  put: jest.fn().mockReturnValue({
    status: 200,
    headers: {
      api: 'foo',
      'content-type': 'application/json'
    },
    data: { name: 'foo' }
  }),
  delete: jest.fn().mockReturnValue({
    status: 200,
    headers: {
      api: 'foo',
      'content-type': 'application/json'
    },
    data: {}
  })
}
