import { IContact } from '@/domain/protocols/contact'
import { ContactOutputDto } from '@/main/dtos/contact-output.dto'
import { CreateContactDto } from '@/main/dtos/create-contact.dto'
import { CreateContactController } from '@/presentation/create-contact-controller'
import { fixtureContact, fixtureContactOutput } from '@/tests/fixtures/fixturesContact'

class ContactStub implements IContact {
  async create (contactDto: CreateContactDto): Promise<ContactOutputDto | null> {
    return await new Promise(resolve => { resolve(fixtureContactOutput()) })
  }
}
const contactStub = new ContactStub()
const sut = new CreateContactController(contactStub)
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
      .mockImplementationOnce(() => { throw new Error('Internal server error') })
    const expectedResponse = await sut.handle(fixtureContact())
    expect(expectedResponse.statusCode).toBe(500)
    expect(expectedResponse.body).toEqual(new Error('Internal server error'))
  })
})
