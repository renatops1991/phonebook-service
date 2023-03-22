export interface IValidator {
  isValidEmail: (email: string) => boolean
  hasValidPhoneNumber: (phone: string) => boolean
}
