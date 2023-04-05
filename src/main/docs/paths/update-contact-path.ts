export const updateContactPath = {
  put: {
    tags: ['Contact'],
    summary: 'Update contact',
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
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/updateContact'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Update Contact Successfully',
        $ref: '#/components/success'
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
