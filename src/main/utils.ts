export const getFieldsWithValidValues = (objectFields: any): Record<string, unknown> => {
  return Object.fromEntries(
    Object.entries(objectFields).filter(([_, value]) => !!value)
  )
}
