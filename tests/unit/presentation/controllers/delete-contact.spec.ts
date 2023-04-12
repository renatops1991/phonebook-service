import { DeleteContact } from '@/presentation/controllers/delete-contact'
import { contactUseCaseStub } from '@/tests/unit/mocks/mock-contact'
import { mockValidation } from '@/tests/unit/mocks/mock-validate'
import { fixtureContact } from '../../fixtures/fixturesContact'

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
})
