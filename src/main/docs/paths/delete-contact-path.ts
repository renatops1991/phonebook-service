export const deleteContactPath = {
  delete: {
    tags: ['Contact'],
    summary: 'Delete a contact',
    parameters: [
      {
        in: 'path',
        name: 'email',
        required: true,
        schema: {
          type: 'string'
        }
      }
    ],
    responses: {
      204: {
        description: 'Delete Contact Successfully'
      },
      400: {
        description: 'Bad request',
        $ref: '#/components/badRequest'
      },
      500: {
        description: 'Internal Server Error',
        $ref: '#/components/serverError'
      }
    }
  }
}
