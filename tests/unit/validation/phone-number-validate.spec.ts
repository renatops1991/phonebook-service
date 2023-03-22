import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { mockValidator } from '@/tests/mocks/mock-validate'
import { PhoneNumberValidate } from '@/validation/phone-number-validate'

const validateStub = mockValidator()
const sut = new PhoneNumberValidate('phones', validateStub)

describe('PhoneNumberValidate', () => {
  it('Should call hasValidPhoneNumber method with correct value', () => {
    const hasValidPhoneNumberSpy = jest
      .spyOn(validateStub, 'hasValidPhoneNumber')
    sut.validate({ phones: ['11945782698'] })
    expect(hasValidPhoneNumberSpy).toHaveBeenCalledWith('11945782698')
  })

  it('Should return null if hasValidPhoneNumber method on succeeds', () => {
    jest
      .spyOn(validateStub, 'hasValidPhoneNumber')
    const expectedResponse = sut.validate({ phone: ['11945782698'] })
    expect(expectedResponse).toBeNull()
  })

  it('Should return InvalidParamError custom error if provide phone is invalid', () => {
    jest
      .spyOn(validateStub, 'hasValidPhoneNumber').mockReturnValueOnce(false)
    const expectedResponse = sut.validate({ phones: ['00'] })
    expect(expectedResponse).toEqual(new InvalidParamError('phones: in position 0').serializeErrors())
  })
})
