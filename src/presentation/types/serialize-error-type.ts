import { ErrorTypeEnum } from '../enum/error-type-enum'

export type SerializeErrorType = {
  type: ErrorTypeEnum
  field?: string
  message: string
  stack?: any
}
