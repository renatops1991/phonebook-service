import { InvalidFilterError } from '@/presentation/errors/invalid-filter-error'
import { FilterValidate } from '@/validation/filter-validate'

const sut = new FilterValidate('firstName')
describe('RequiredField', () => {
  it('Should return InvalidFilterError custom error if validation fails', () => {
    const expectedResponse = sut.validate({ firstName: 'foo' })
    expect(expectedResponse).toEqual(new InvalidFilterError().serializeErrors())
    expect(expectedResponse?.message).toEqual('Invalid filter: please choose between name, email, address, phones or postcode')
  })

  it('Should return null if validate method on succeeds', () => {
    const expectedResponse = sut.validate({ email: 'foo@example.com' })
    expect(expectedResponse).toBeNull()
  })
})
