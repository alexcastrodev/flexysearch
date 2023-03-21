import SearchEngine from '..'
import { RuleNumberOptions, RuleOperator } from '../../interfaces'
import collection from '../../../../__mocks__/movies.json'
import expectedNumberNotContains from './__mocks__/numbers/expectedNumberNotContains.json'
import expectedNumberNotEmpty from './__mocks__/numbers/expectedNumberNotEmpty.json'
import expectedNumberEmpty from './__mocks__/numbers/expectedNumberEmpty.json'
import expectDifferentFrom from './__mocks__/numbers/expectDifferentFrom.json'
import expectBiggerThan from './__mocks__/numbers/expectBiggerThan.json'
import expectBiggerOrEquals from './__mocks__/numbers/expectBiggerOrEquals.json'
import expectSmallerOrEquals from './__mocks__/numbers/expectSmallerOrEquals.json'
import expectSmallerThan from './__mocks__/numbers/expectSmallerThan.json'

describe('Should match number', () => {
  it('[Number]: Should cause exception', () => {
    const results = () =>
      new SearchEngine(collection).search([
        {
          field: 'title',
          term: 'film 3',
          role: 'notExist' as RuleNumberOptions,
          type: 'number',
          operator: RuleOperator.AND,
        },
      ])

    expect(results).toThrow('[flexysearch]: Invalid role in Numbers')
  })
  it('[Number]: Contains', () => {
    const results = new SearchEngine(collection).search([
      {
        field: 'year',
        term: 2014,
        role: RuleNumberOptions.contains,
        type: 'number',
        operator: RuleOperator.AND,
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
  it('[Number]: Not Contains', () => {
    const results = new SearchEngine(collection).search([
      {
        field: 'year',
        term: 2014,
        role: RuleNumberOptions.notContains,
        type: 'number',
        operator: RuleOperator.AND,
      },
    ])

    expect(results).toStrictEqual(expectedNumberNotContains)
  })
  it('[Number]: equals', () => {
    const results = new SearchEngine(collection).search([
      {
        field: 'year',
        term: 2014,
        role: RuleNumberOptions.equals,
        type: 'number',
        operator: RuleOperator.AND,
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
  it('[Number]: Empty', () => {
    const results = new SearchEngine(collection).search([
      {
        field: 'year',
        role: RuleNumberOptions.isEmpty,
        type: 'number',
        operator: RuleOperator.AND,
      },
    ])

    expect(results).toStrictEqual(expectedNumberEmpty)
  })
  it('[Number]: Not Empty', () => {
    const results = new SearchEngine(collection).search([
      {
        field: 'year',
        role: RuleNumberOptions.isNotEmpty,
        type: 'number',
        operator: RuleOperator.AND,
      },
    ])

    expect(results).toStrictEqual(expectedNumberNotEmpty)
  })
  it('[Number]: Different from', () => {
    const results = new SearchEngine(collection).search([
      {
        field: 'year',
        role: RuleNumberOptions.isNotEquals,
        term: 2014,
        type: 'number',
        operator: RuleOperator.AND,
      },
    ])

    expect(results).toStrictEqual(expectDifferentFrom)
  })
  it('[Number]: bigger than', () => {
    const results = new SearchEngine(collection).search([
      {
        field: 'year',
        role: RuleNumberOptions.biggerThan,
        term: 2014,
        type: 'number',
        operator: RuleOperator.AND,
      },
    ])

    expect(results).toStrictEqual(expectBiggerThan)
  })
  it('[Number]: smaller than', () => {
    const results = new SearchEngine(collection).search([
      {
        field: 'year',
        role: RuleNumberOptions.smallerThan,
        term: 2014,
        type: 'number',
        operator: RuleOperator.AND,
      },
    ])

    expect(results).toStrictEqual(expectSmallerThan)
  })

  it('[Number]: bigger or equals', () => {
    const results = new SearchEngine(collection).search([
      {
        field: 'year',
        role: RuleNumberOptions.biggerOrEquals,
        term: 2014,
        type: 'number',
        operator: RuleOperator.AND,
      },
    ])

    expect(results).toStrictEqual(expectBiggerOrEquals)
  })
  it('[Number]: smaller or equals', () => {
    const results = new SearchEngine(collection).search([
      {
        field: 'year',
        role: RuleNumberOptions.smallerOrEquals,
        term: 2014,
        type: 'number',
        operator: RuleOperator.AND,
      },
    ])

    expect(results).toStrictEqual(expectSmallerOrEquals)
  })
})
