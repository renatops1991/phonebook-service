export const getFieldsWithValidValues = (objectFields: any): Record<string, unknown> => {
  return Object.fromEntries(
    Object.entries(objectFields).filter(([_, value]) => !!value)
  )
}

export const makeDescriptionWeatherByTemperature = (
  temperature: number,
  condition?: string
): string => {
  if (temperature <= 18) {
    return 'Ofereça um chocolate quente ao seu contato...'
  }
  if (temperature >= 30 && condition === '32') {
    return 'Convide seu contato para ir à praia com esse calor!'
  }
  if (temperature >= 30 && condition === '45') {
    return 'Convide seu contato para tomar um sorvete'
  }
  if ((temperature > 18 && temperature < 30) && condition === '32') {
    return 'Convide seu contato para fazer alguma atividade ao livre'
  }
  if ((temperature > 18 && temperature < 30) && condition === '45') {
    return 'Convide seu contato para ver um filme'
  }

  return 'Convide seu contato para fazer uma caminhada'
}
