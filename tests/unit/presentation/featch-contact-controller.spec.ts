import { IContact } from '@/domain/protocols/contact'
import { FilterContactDto, UpdateContactDto } from '@/main/dtos'
import { ContactOutputDto } from '@/main/dtos/contact-output.dto'
import { CreateContactDto } from '@/main/dtos/create-contact.dto'
import { FetchContact } from '@/presentation/controllers/fetch-contact'
import { InvalidFilterError } from '@/presentation/errors/invalid-filter-error'
import { NotFoundError } from '@/presentation/errors/not-found-error'
import { ServerError } from '@/presentation/errors/server-error'
import { badRequest, notFound, serverError } from '@/presentation/helpers/http-protocols-helper'
import { fixtureContactOutput, fixtureFilterContact } from '@/tests/fixtures/fixturesContact'
import { mockValidation } from '@/tests/mocks/mock-validate'

class ContactStub implements IContact {
  async fetchContacts (filterContactDto: FilterContactDto): Promise<ContactOutputDto[]> {
    return await new Promise(resolve => { resolve([fixtureContactOutput()]) })
  }

  async create (contactDto: CreateContactDto): Promise<ContactOutputDto | null> {
    return await new Promise(resolve => { resolve(fixtureContactOutput()) })
  }

  update: (updateContactDto: UpdateContactDto) => Promise<ContactOutputDto>
}
const validationStub = mockValidation()
const contactStub = new ContactStub()
const sut = new FetchContact(contactStub, validationStub)
describe('FetchContactController', () => {
  it('Should call fetchContacts method of the Contact UseCase with correct values', async () => {
    const createContactSpy = jest
      .spyOn(contactStub, 'fetchContacts')
    await sut.handle(fixtureFilterContact())
    expect(createContactSpy).toHaveBeenCalledWith(fixtureFilterContact())
  })

  it('Should return 500 error if fetchContacts method throw exception error', async () => {
    jest
      .spyOn(contactStub, 'fetchContacts')
      .mockImplementationOnce(() => { throw new Error() })
    const expectedResponse = await sut.handle(fixtureFilterContact())
    expect(expectedResponse.statusCode).toBe(500)
    expect(expectedResponse.body.message).toEqual('Internal Server Error')
    expect(expectedResponse).toEqual(serverError(new ServerError(expectedResponse.body.stack)))
  })

  it('Should return 404 error if fetchContacts method of the Contact UseCase returns empty', async () => {
    jest
      .spyOn(contactStub, 'fetchContacts')
      .mockResolvedValueOnce([])
    const expectedResponse = await sut.handle(fixtureFilterContact())
    expect(expectedResponse.statusCode).toBe(404)
    expect(expectedResponse).toEqual(notFound(new NotFoundError().serializeErrors()))
  })

  it('Should return 400 error if filter no exists', async () => {
    const filterContactDto = {
      fistName: 'John foo bar'
    }
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new InvalidFilterError().serializeErrors())
    const expectedResponse = await sut.handle(filterContactDto as any)
    expect(expectedResponse).toEqual(badRequest(new InvalidFilterError().serializeErrors()))
  })

  it('Should return success if create method on succeeds', async () => {
    const expectedResponse = await sut.handle(fixtureFilterContact())
    expect(expectedResponse.statusCode).toBe(200)
    expect(expectedResponse.body).toEqual([fixtureContactOutput()])
  })
})
