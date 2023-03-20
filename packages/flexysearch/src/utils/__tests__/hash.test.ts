import { hashCode } from '../hash'

describe('Should match strings', () => {
  it('[String]: Should create hashCode string', () => {
    const hash = hashCode('Alex')
    const hash2 = hashCode('Alex')
    const hash3 = hashCode('Alexa')

    expect(hash).toBe(hash2)
    expect(hash).not.toBe(hash3)
    expect(hash2).not.toBe(hash3)
  })
})
