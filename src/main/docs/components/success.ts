export const success = {
  description: 'Successfully',
  content: {
    'application/json': {
      schema: {
        type: 'array',
        items: {
          $ref: '#/schemas/contact'
        }
      }
    }
  }
}
