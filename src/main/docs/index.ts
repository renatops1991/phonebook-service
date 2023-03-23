export default {
  openapi: '3.0.0',
  info: {
    title: 'Phone book API',
    description: 'The Phone book service is a phone contact API. Where you can create, update and search contact data bringing together weather forecast data from the HG Brasil',
    version: '1.0.0'
  },
  servers: [
    {
      url: 'http://localhost:3001/api',
      description: 'Main server'
    }
  ]
}
