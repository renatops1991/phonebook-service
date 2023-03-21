export interface IValidator {
  isValidEmail: (email: string) => boolean
  isValidPhoneNumber: (phone: string) => boolean
}
