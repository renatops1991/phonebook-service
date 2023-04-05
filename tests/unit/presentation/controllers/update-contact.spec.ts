import { UpdateContact } from '@/presentation/controllers/update-contact'
import { fixtureUpdateContact } from '@/tests/fixtures/fixturesContact'
import { contactUseCaseStub } from '@/tests/mocks/mock-contact'

const contactStub = contactUseCaseStub()
const sut = new UpdateContact(contactStub)
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
})
