import SearchEngine from '..'
import { RuleOperator } from '../../interfaces'
import collection from '../../../../__mocks__/movies.json'

interface IMovie {
  id: number
  title: string
  year: number
}

describe('Should match strings', () => {
  it('[String]: Should cause exception', () => {
    const results = () =>
      new SearchEngine(collection).search([
        {
          type: 'custom',
          operator: RuleOperator.AND,
        },
      ])

    expect(results).toThrow('[flexysearch]: Custom filter not valid')
  })
  it('[String]: Should cause exception', () => {
    const results = new SearchEngine(collection).search([
      {
        type: 'custom',
        operator: RuleOperator.AND,
        filter: (datum: IMovie) => {
          return datum.year === 2009
        },
      },
    ])

    expect(results).toStrictEqual([
      {
        id: 1,
        title: 'Film 1',
        year: 2009,
      },
      {
        id: 7,
        title: 'Film 7',
        year: 2009,
      },
    ])
  })
})
