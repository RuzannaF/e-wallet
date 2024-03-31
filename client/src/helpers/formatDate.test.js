import { formatDate } from './formatDate'

describe('formatDate', () => {
  test('Получение правильного формата даты', () => {
    const transactionDate = '2024-03-11T15:47:42.826+06:00'

    const result = formatDate(transactionDate)

    expect(result).toBe('11.03.2024 15:47:42')
  })
})