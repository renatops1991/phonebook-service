export const updateContactParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      example: 'John foo bar'
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
