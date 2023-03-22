import { ValidatorAdapter } from '@/infra/validators/validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  },
  isMobilePhone (): boolean {
    return true
  }
}))
const sut = new ValidatorAdapter()

describe('ValidatorAdapter', () => {
  describe('isValidEmail', () => {
    it('Should call isEmail method of the validator lib with correct value', () => {
      const isEmailSpy = jest.spyOn(validator, 'isEmail')
      sut.isValidEmail('foo@example.com')
      expect(isEmailSpy).toHaveBeenCalledWith('foo@example.com')
    })

    it('Should return false if the provided email is invalid', () => {
      jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
      const expectedResponse = sut.isValidEmail('foo')
      expect(expectedResponse).toBeFalsy()
    })

    it('Should return true if the provided email is valid', () => {
      const expectedResponse = sut.isValidEmail('foo@example.com')
      expect(expectedResponse).toBeTruthy()
    })
  })

  describe('hasValidPhoneNumber', () => {
    it('Should call hasValidPhoneNumber method of the validator lib with correct value', () => {
      const isMobilePhone = jest.spyOn(validator, 'isMobilePhone')
      sut.hasValidPhoneNumber('11945752156')
      expect(isMobilePhone).toHaveBeenCalledWith('11945752156', 'pt-BR')
    })

    it('Should return false if the provided phone number is invalid', () => {
      jest.spyOn(validator, 'isMobilePhone').mockReturnValueOnce(false)
      const expectedResponse = sut.hasValidPhoneNumber('00')
      expect(expectedResponse).toBeFalsy()
    })

    it('Should return true if the provided phone number is valid', () => {
      const expectedResponse = sut.hasValidPhoneNumber('11945752156')
      expect(expectedResponse).toBeTruthy()
    })
  })
})
