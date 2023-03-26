export const created = {
  description: 'Created Successfully',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '641c62b8db837490c441e4bd'
          },
          name: {
            type: 'string',
            example: 'John foo bar'
          },
          email: {
            type: 'string',
            example: 'john@example.com'
          },
          address: {
            type: 'object',
            properties: {
              street: {
                type: 'string',
                example: 'foo'
              },
              number: {
                type: 'string',
                example: '44'
              },
              postcode: {
                type: 'string',
                example: '000000'
              },
              complements: {
                type: 'string',
                example: 'bar'
              },
              city: {
                type: 'string',
                example: 'foo'
              },
              state: {
                type: 'string',
                example: 'SP'
              }
            }
          },
          phones: {
            type: 'array',
            example: ['11945789632', '11945789633']
          }
        }
      }
    }
  }
}
