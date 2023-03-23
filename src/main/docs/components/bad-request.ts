export const badRequest = {
  description: 'Bad Request',
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
                example: 'INVALID_PARAM_ERROR'
              },
              field: {
                type: 'string',
                example: 'email'
              },
              message: {
                type: 'string',
                example: 'Invalid param error'
              }
            }
          }
        }
      }
    }
  }
}
