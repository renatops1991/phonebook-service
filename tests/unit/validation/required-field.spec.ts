import { MissingMandatoryParamError } from '@/presentation/errors/missing-mandatory-param-error'
import { RequiredField } from '@/validation/required-field'

const sut = new RequiredField('name')
describe('RequiredField', () => {
  it('Should return MissingMandatoryParamError custom error if validation fails', () => {
    const expectedResponse = sut.validate({ name: '' })
    expect(expectedResponse).toEqual(new MissingMandatoryParamError('name').serializeErrors())
    expect(expectedResponse?.message).toEqual('Missing mandatory parameter')
  })

  it('Should return null if validate method on succeeds', () => {
    const expectedResponse = sut.validate({ name: 'foo' })
    expect(expectedResponse).toBeNull()
  })
})
