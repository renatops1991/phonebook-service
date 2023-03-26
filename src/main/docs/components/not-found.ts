export const notFound = {
  description: 'Not Found',
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
                example: 'NOT_FOUND'
              },
              message: {
                type: 'string',
                example: 'Search not found'
              }
            }
          }
        }
      }
    }
  }
}
