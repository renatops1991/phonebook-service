import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { mockValidator } from '@/tests/mocks/mock-validate'
import { EmailValidate } from '@/validation/email-validate'

const validateStub = mockValidator()
const sut = new EmailValidate('email', validateStub)

describe('EmailValidate', () => {
  it('Should call isValidEmail os the validator class with correct value', () => {
    const validEmailSpy = jest.spyOn(validateStub, 'isValidEmail')
    sut.validate({ email: 'foo@example.com' })
    expect(validEmailSpy).toHaveBeenCalledWith('foo@example.com')
  })
  it('Should return null if email not exists', () => {
    const expectedResponse = sut.validate('')
    expect(expectedResponse).toBeNull()
  })
  it('Should return a InvalidParamError custom error if email is invalid', () => {
    jest.spyOn(validateStub, 'isValidEmail').mockReturnValueOnce(false)
    const expectedResponse = sut.validate({ email: 'foo' })
    expect(expectedResponse).toEqual(new InvalidParamError('email').serializeErrors())
  })
})
