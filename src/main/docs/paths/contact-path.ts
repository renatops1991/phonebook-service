export const contactPath = {
  post: {
    tags: ['Contact'],
    summary: 'Create contact',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/contact'
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Created Successfully',
        $ref: '#/components/success'
      },
      400: {
        description: 'Bad request',
        $ref: '#/components/badRequest'
      },
      403: {
        description: 'Forbidden',
        $ref: '#/components/forbidden'
      },
      500: {
        description: 'Internal Server Error',
        $ref: '#/components/serverError'
      }
    }
  }
}
