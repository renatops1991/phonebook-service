import * as utils from '@/main/utils'

describe('Utils', () => {
  describe('getFieldsWithValidValues', () => {
    it('Should return correctly only fields with values', () => {
      const contact = {
        name: 'John',
        address: '',
        phones: ['1165985563', '1165985562']
      }
      const expectedResponse = utils.getFieldsWithValidValues(contact)
      expect(expectedResponse).toEqual({
        name: 'John',
        phones: ['1165985563', '1165985562']
      })
    })
  })

  describe('makeDescriptionWeatherByTemperature', () => {
    it('Should return "Convide seu contato para fazer uma caminhada" description by default', async () => {
      const temperature = 24
      const sut = utils.makeDescriptionWeatherByTemperature(temperature, undefined)
      expect(sut).toEqual('Convide seu contato para fazer uma caminhada')
    })

    it('Should return "Convide seu contato para fazer uma caminhada" if temperature is null', async () => {
      const temperature = null
      const sut = utils.makeDescriptionWeatherByTemperature(temperature, undefined)
      expect(sut).toEqual('Convide seu contato para fazer uma caminhada')
    })

    it('Should return "Ofereça um chocolate quente ao seu contato..." description it temperature is equal or less than 18', async () => {
      const temperature = 18
      const sut = utils.makeDescriptionWeatherByTemperature(temperature, undefined)
      expect(sut).toEqual('Ofereça um chocolate quente ao seu contato...')
    })

    it('Should return "Convide seu contato para ir à praia com esse calor!" description if temperature greater than 30 and condition is equals 32', async () => {
      const temperature = 31
      const sut = utils.makeDescriptionWeatherByTemperature(temperature, '32')
      expect(sut).toEqual('Convide seu contato para ir à praia com esse calor!')
    })

    it('Should return "Convide seu contato para tomar um sorvete" description if temperature greater than 30 and condition is equals 45', async () => {
      const temperature = 31
      const sut = utils.makeDescriptionWeatherByTemperature(temperature, '45')
      expect(sut).toEqual('Convide seu contato para tomar um sorvete')
    })

    it('Should return "Convide seu contato para fazer alguma atividade ao livre" description if temperature greater than 18 and less than 30 and condition is equals 32', async () => {
      const temperature = 24
      const sut = utils.makeDescriptionWeatherByTemperature(temperature, '32')
      expect(sut).toEqual('Convide seu contato para fazer alguma atividade ao livre')
    })

    it('Should return "Convide seu contato para ver um filme" description if temperature greater than 18 and less than 30 and condition is equals 45', async () => {
      const temperature = 24
      const sut = utils.makeDescriptionWeatherByTemperature(temperature, '45')
      expect(sut).toEqual('Convide seu contato para ver um filme')
    })
  })
})
