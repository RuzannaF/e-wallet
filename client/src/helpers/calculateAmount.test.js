import { calculateAmount } from './calculateAmount';

describe('calculateAmount', () => {
  test('Тест высчитывания значения таргет валюты', () => {
    const rates = 1.5
    const currencyType = 'target'
    const amount = 10

    const result = calculateAmount(rates, currencyType, amount)

    expect(result).toBe(15)
  });

  test('Тест высчитывания значения базовой валюты', () => {
    const rates = 1.5
    const currencyType = 'base'
    const amount = 15

    const result = calculateAmount(rates, currencyType, amount)

    expect(result).toBe(10)
  })
})