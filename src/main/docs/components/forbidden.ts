export const forbidden = {
  description: 'Forbidden',
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
                example: 'EMAIL_IS_ALREADY_USE'
              },
              message: {
                type: 'string',
                example: 'The received email is already in use'
              }
            }
          }
        }
      }
    }
  }
}
