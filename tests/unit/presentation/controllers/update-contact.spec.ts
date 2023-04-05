import { UpdateContact } from '@/presentation/controllers/update-contact'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { ServerError } from '@/presentation/errors/server-error'
import { badRequest, serverError, success } from '@/presentation/helpers/http-protocols-helper'
import { fixtureUpdateContact, fixtureUpdateContactOutput } from '@/tests/fixtures/fixturesContact'
import { contactUseCaseStub } from '@/tests/mocks/mock-contact'
import { mockValidation } from '@/tests/mocks/mock-validate'

const validationStub = mockValidation()
const contactStub = contactUseCaseStub()
const sut = new UpdateContact(contactStub, validationStub)
describe('updateContactController', () => {
  const updateContactDto = Object.assign({
    ...fixtureUpdateContact(),
    email: 'john@foo.com'
  })

  it('Should call update method of the UseCase with correct values', async () => {
    const updateSpy = jest
      .spyOn(contactStub, 'update')

    await sut.handle(updateContactDto)
    expect(updateSpy).toHaveBeenCalledWith(updateContactDto.email, updateContactDto)
  })

  it('Should call validation with correct values', async () => {
    const validateSpy = jest
      .spyOn(validationStub, 'validate')

    await sut.handle(updateContactDto)
    expect(validateSpy).toHaveBeenCalledWith(updateContactDto)
  })

  it('Should return 400 error if validate method return error', async () => {
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new InvalidParamError('phones').serializeErrors())

    const expectedResponse = await sut.handle(updateContactDto)
    expect(expectedResponse).toEqual(badRequest(new InvalidParamError('phones').serializeErrors()))
  })

  it('Should return 200 status code and contact updated on succeeds', async () => {
    jest
      .spyOn(contactStub, 'update')

    const expectedResponse = await sut.handle(updateContactDto)
    expect(expectedResponse).toEqual(success(fixtureUpdateContactOutput()))
  })

  it('Should return 500 error if update method throw exception error', async () => {
    jest
      .spyOn(contactStub, 'update')
      .mockImplementationOnce(() => { throw new Error() })
    const expectedResponse = await sut.handle(updateContactDto)
    expect(expectedResponse.statusCode).toBe(500)
    expect(expectedResponse.body.message).toEqual('Internal Server Error')
    expect(expectedResponse).toEqual(serverError(new ServerError(expectedResponse.body.stack)))
  })
})
