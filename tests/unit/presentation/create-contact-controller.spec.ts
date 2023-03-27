import { IContact } from '@/domain/protocols/contact'
import { FilterContactDto, UpdateContactDto } from '@/main/dtos'
import { ContactOutputDto } from '@/main/dtos/contact-output.dto'
import { CreateContactDto } from '@/main/dtos/create-contact.dto'
import { CreateContact } from '@/presentation/controllers/create-contact'
import { EmailInUseError } from '@/presentation/errors/email-in-use-error'
import { ServerError } from '@/presentation/errors/server-error'
import { badRequest, forbidden, serverError } from '@/presentation/helpers/http-protocols-helper'
import { fixtureContact, fixtureContactOutput } from '@/tests/fixtures/fixturesContact'
import { mockValidation } from '@/tests/mocks/mock-validate'

class ContactStub implements IContact {
  update: (email: string, updateContactDto: UpdateContactDto) => Promise<ContactOutputDto>
  fetchContacts: (filterContactDto: FilterContactDto) => Promise<ContactOutputDto[]>
  async create (contactDto: CreateContactDto): Promise<ContactOutputDto | null> {
    return await new Promise(resolve => { resolve(fixtureContactOutput()) })
  }
}
const validationStub = mockValidation()
const contactStub = new ContactStub()
const sut = new CreateContact(contactStub, validationStub)
describe('CreateContactController', () => {
  it('Should call create method of the Contact UseCase with correct values', async () => {
    const createContactSpy = jest
      .spyOn(contactStub, 'create')
    await sut.handle(fixtureContact())
    expect(createContactSpy).toHaveBeenCalledWith(fixtureContact())
  })

  it('Should return 500 error if create method throw exception error', async () => {
    jest
      .spyOn(contactStub, 'create')
      .mockImplementationOnce(() => { throw new Error() })
    const expectedResponse = await sut.handle(fixtureContact())
    expect(expectedResponse.statusCode).toBe(500)
    expect(expectedResponse.body.message).toEqual('Internal Server Error')
    expect(expectedResponse).toEqual(serverError(new ServerError(expectedResponse.body.stack)))
  })

  it('Should return 403 error if create method of the Contact UseCase returns null', async () => {
    jest
      .spyOn(contactStub, 'create')
      .mockResolvedValueOnce(null)
    const expectedResponse = await sut.handle(fixtureContact())
    expect(expectedResponse.statusCode).toBe(403)
    expect(expectedResponse).toEqual(forbidden((new EmailInUseError().serializeErrors())))
  })

  it('Should call validate method of the validation composite class with corrects values ', async () => {
    const validationSpy = jest
      .spyOn(validationStub, 'validate')
    await sut.handle(fixtureContact())
    expect(validationSpy).toHaveBeenCalledWith(fixtureContact())
  })

  it('Should return 400 error if validate method return error', async () => {
    const contactDto = fixtureContact()
    contactDto.email = 'foo@'
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new EmailInUseError().serializeErrors())
    const expectedResponse = await sut.handle(contactDto)
    expect(expectedResponse).toEqual(badRequest(new EmailInUseError().serializeErrors()))
  })

  it('Should return success if create method on succeeds', async () => {
    const expectedResponse = await sut.handle(fixtureContact())
    expect(expectedResponse.statusCode).toBe(201)
    expect(expectedResponse.body).toEqual(fixtureContactOutput())
  })
})
