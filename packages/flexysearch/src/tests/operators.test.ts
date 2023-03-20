import { RuleNumberOptions } from './../../interfaces/index'
import SearchEngine from '..'
import { IRuleType, RuleOperator, RuleStringOptions } from '../../interfaces'
import collection from '../../__mocks__/movies.json'

describe('Should match strings', () => {
  it('[Number]: Should cause exception', () => {
    const results = () =>
      new SearchEngine(collection).search([
        {
          field: 'title',
          term: 'film 3',
          role: RuleStringOptions.contains,
          type: 'dateee' as IRuleType,
          operator: RuleOperator.AND,
        },
      ])

    expect(results).toThrow('[flexysearch]: Processor not found')
  })
  it('[Operators]: Contains', () => {
    const results = new SearchEngine(collection).search([
      {
        field: 'title',
        term: 'film 3',
        role: RuleStringOptions.contains,
        type: 'string',
        operator: RuleOperator.AND,
      },
      {
        field: 'year',
        term: '2014',
        role: RuleNumberOptions.equals,
        type: 'number',
        operator: RuleOperator.OR,
      },
    ])

    expect(results).toStrictEqual([
      {
        id: 3,
        title: 'Film 3',
        year: 2014,
      },
      {
        id: 4,
        title: 'Film 4',
        year: 2014,
      },
    ])
  })
})
