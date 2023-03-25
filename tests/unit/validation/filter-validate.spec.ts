import { InvalidFilterError } from '@/presentation/errors/invalid-filter-error'
import { FilterValidate } from '@/validation/filter-validate'

const sut = new FilterValidate(['name', 'email', 'phone', 'postcode', 'address'])
describe('FilterValidate', () => {
  it('Should return InvalidFilterError custom error if provided field is not mapped in filter', () => {
    const expectedResponse = sut.validate({ firstName: 'foo' })
    expect(expectedResponse).toEqual(new InvalidFilterError().serializeErrors())
    expect(expectedResponse?.message).toEqual('Invalid filter: please choose between name, email, address, phones or postcode')
  })

  it('Should return null if validate method on succeeds', () => {
    const expectedResponse = sut.validate({ email: 'foo@example.com', phone: '115457866' })
    expect(expectedResponse).toBeNull()
  })
})
