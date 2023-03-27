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
})
