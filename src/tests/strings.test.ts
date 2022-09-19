import SearchEngine from '..'
import { RuleOperator, RuleStringOptions } from '../../interfaces'
import collection from '../../__mocks__/movies.json'
import collectionItems from '../../__mocks__/items.json'
import expectedNotContains from './__mocks__/strings/expectedNotContains.json'
import expectedEquals from './__mocks__/strings/expectedEquals.json'
import expectedEmpty from './__mocks__/strings/expectedEmpty.json'

describe('Should match strings', () => {
  it('[String]: Should cause exception', () => {
    const results = () =>
      new SearchEngine(collection).search([
        {
          field: 'title',
          term: 'film 3',
          role: 'notExist' as RuleStringOptions,
          type: 'string',
          operator: RuleOperator.AND,
        },
      ])

    expect(results).toThrow('[flexysearch]: Invalid role in String')
  })

  it('[String]: Contains', () => {
    const results = new SearchEngine(collection).search([
      {
        field: 'title',
        term: 'film 3',
        role: RuleStringOptions.contains,
        type: 'string',
        operator: RuleOperator.AND,
      },
    ])

    expect(results).toStrictEqual([
      {
        id: 3,
        title: 'Film 3',
        year: 2014,
      },
    ])
  })
  it('[String]: Not Contains', () => {
    const results = new SearchEngine(collection).search([
      {
        field: 'title',
        term: 'Film 1',
        role: RuleStringOptions.notContains,
        type: 'string',
        operator: RuleOperator.AND,
      },
    ])

    expect(results).toStrictEqual(expectedNotContains)
  })
  it('[String]: Equals', () => {
    const resultsCaseInsentive = new SearchEngine(collection).search([
      {
        field: 'title',
        role: RuleStringOptions.equals,
        term: 'fiLM 1',
        type: 'string',
        operator: RuleOperator.AND,
      },
    ])

    expect(resultsCaseInsentive.length).toBe(1)

    const results_caseSensitive = new SearchEngine(collection).search([
      {
        field: 'title',
        role: RuleStringOptions.equals,
        term: 'Film 1',
        type: 'string',
        operator: RuleOperator.AND,
        caseSensitive: true,
      },
    ])
    const resultscaseSensitiveFailed = new SearchEngine(collection).search([
      {
        field: 'title',
        role: RuleStringOptions.equals,
        term: 'film 1',
        type: 'string',
        operator: RuleOperator.AND,
        caseSensitive: true,
      },
    ])

    expect(results_caseSensitive.length).toBe(1)
    expect(resultscaseSensitiveFailed.length).toBe(0)
    expect(results_caseSensitive).toStrictEqual(expectedEquals)
  })
  it('[String]: Empty', () => {
    const results = new SearchEngine(collectionItems).search([
      {
        field: 'colors',
        role: RuleStringOptions.isEmpty,
        type: 'string',
        operator: RuleOperator.AND,
      },
    ])

    expect(results.length).toBe(5)
    expect(results).toStrictEqual(expectedEmpty)
  })
  it('[String]: Is not empty', () => {
    const results = new SearchEngine(collectionItems).search([
      {
        field: 'colors',
        role: RuleStringOptions.isNotEmpty,
        type: 'string',
        operator: RuleOperator.AND,
      },
    ])

    expect(results.length).toBe(2)
  })
  it('[String]: search case sensitive', () => {
    const results = new SearchEngine(collectionItems).search([
      {
        field: 'colors',
        role: RuleStringOptions.contains,
        term: 'Blue',
        type: 'string',
        operator: RuleOperator.AND,
        caseSensitive: true,
      },
    ])

    expect(results.length).toBe(1)
  })
})
