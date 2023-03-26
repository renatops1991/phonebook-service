export const contactsSchema = {
  type: 'array',
  items: {
    $ref: '#/schemas/contacts'
  }
}
