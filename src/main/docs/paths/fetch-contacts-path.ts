export const fetchContactsPath = {
  get: {
    tags: ['Contact'],
    summary: 'Fetch Contacts',
    parameters: [
      {
        in: 'query',
        name: 'name',
        required: false,
        schema: {
          type: 'string'
        }
      },
      {
        in: 'query',
        name: 'email',
        required: false,
        schema: {
          type: 'string'
        }
      },
      {
        in: 'query',
        name: 'phone',
        required: false,
        schema: {
          type: 'string'
        }
      },
      {
        in: 'query',
        name: 'address',
        required: false,
        schema: {
          type: 'string'
        }
      },
      {
        in: 'query',
        name: 'postcode',
        required: false,
        schema: {
          type: 'string'
        }
      }
    ],
    responses: {
      200: {
        description: 'Successfully',
        $ref: '#/components/success'
      },
      400: {
        description: 'Bad request',
        $ref: '#/components/badRequest'
      },
      404: {
        description: 'Not Found',
        $ref: '#/components/notFound'
      },
      500: {
        description: 'Internal Server Error',
        $ref: '#/components/serverError'
      }
    }
  }
}
