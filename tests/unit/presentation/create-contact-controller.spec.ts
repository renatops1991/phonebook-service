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
describe('CreateContactController', () => {
  it('Should call create method of the Contact UseCase with correct values', async () => {
    const sut = new CreateContactController(contactStub)
    const createContactSpy = jest
      .spyOn(contactStub, 'create')
    await sut.handle(fixtureContact())
    expect(createContactSpy).toHaveBeenCalledWith(fixtureContact())
  })
})
