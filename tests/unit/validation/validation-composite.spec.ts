import { ValidationComposite } from '@/validation/validation-composite'
import { mockValidation } from '@/tests/unit/mocks/mock-validate'
import { MissingMandatoryParamError } from '@/presentation/errors/missing-mandatory-param-error'

const validationStub = [mockValidation(), mockValidation()]

const sut = new ValidationComposite(validationStub)
describe('ValidationComposite', () => {
  it('Should return an error any validation fails', async () => {
    jest
      .spyOn(validationStub[0], 'validate')
      .mockReturnValueOnce(new MissingMandatoryParamError('email').serializeErrors())
    const expectedResponse = sut.validate({ name: 'foo' })
    expect(expectedResponse).toEqual(new MissingMandatoryParamError('email').serializeErrors())
    expect(expectedResponse?.message).toEqual('Missing mandatory parameter')
  })

  it('Should return null if there is no validation error', async () => {
    const expectedResponse = sut.validate({ name: 'foo' })
    expect(expectedResponse).toBeNull()
  })
})
