import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { mockValidator } from '@/tests/mocks/mock-validate'
import { PhoneNumberValidate } from '@/validation/phone-number-validate'

const validateStub = mockValidator()
const sut = new PhoneNumberValidate('phone', validateStub)

describe('PhoneNumberValidate', () => {
  it('Should call isValidPhoneNumber method with correct value', () => {
    const isValidPhoneNumberSpy = jest
      .spyOn(validateStub, 'isValidPhoneNumber')
    sut.validate({ phone: '11945782698' })
    expect(isValidPhoneNumberSpy).toHaveBeenCalledWith('11945782698')
  })

  it('Should return null if isValidPhoneNumber method on succeeds', () => {
    jest
      .spyOn(validateStub, 'isValidPhoneNumber')
    const expectedResponse = sut.validate({ phone: '11945782698' })
    expect(expectedResponse).toBeNull()
  })

  it('Should return InvalidParamError custom error if provide phone is invalid', () => {
    jest
      .spyOn(validateStub, 'isValidPhoneNumber').mockReturnValueOnce(false)
    const expectedResponse = sut.validate({ phone: '00' })
    expect(expectedResponse).toEqual(new InvalidParamError('phone').serializeErrors())
  })
})
