export const success = {
  description: 'Search found successfully',
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
