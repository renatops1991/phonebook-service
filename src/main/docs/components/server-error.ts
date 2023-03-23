export const serverError = {
  description: 'Server Error',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          error: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                example: 'SERVER_ERROR'
              },
              stack: {
                type: 'string',
                example: 'Error: foo'
              },
              message: {
                type: 'string',
                example: 'Internal Server Error'
              }
            }
          }
        }
      }
    }
  }
}
