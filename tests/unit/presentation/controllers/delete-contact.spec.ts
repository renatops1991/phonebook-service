import { DeleteContact } from '@/presentation/controllers/delete-contact'
import { contactUseCaseStub } from '@/tests/unit/mocks/mock-contact'
import { mockValidation } from '@/tests/unit/mocks/mock-validate'
import { fixtureContact } from '../../fixtures/fixturesContact'
import { EmailInUseError } from '@/presentation/errors/email-in-use-error'
import { badRequest } from '@/presentation/helpers/http-protocols-helper'

const validationStub = mockValidation()
const contactStub = contactUseCaseStub()
const sut = new DeleteContact(contactStub, validationStub)

describe('DeleteContactController', () => {
  it('Should call delete method of the usecase', async () => {
    const deleteSpy = jest
      .spyOn(contactStub, 'delete')
    await sut.handle(fixtureContact().email)
    expect(deleteSpy).toHaveBeenCalledWith(fixtureContact().email)
  })

  it('Should call validate method of the validation composite with correct value', async () => {
    const validateSpy = jest
      .spyOn(validationStub, 'validate')
    await sut.handle(fixtureContact().email)
    expect(validateSpy).toHaveBeenCalledWith(fixtureContact().email)
  })

  it('Should return bad request error if validate method returns error', async () => {
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new EmailInUseError().serializeErrors())
    const expectedResponse = await sut.handle(fixtureContact().email)
    expect(expectedResponse).toEqual(badRequest(new EmailInUseError().serializeErrors()))
  })
})
