import SearchEngine from '..'
import { RuleDateOptions, RuleOperator } from '../../interfaces'
import collection from '../../__mocks__/babyBorns.json'
import babyBornsSequencial from '../../__mocks__/babyBornsSequencial.json'
import expectEmpty from './__mocks__/dates/expectEmpty.json'
import expectNotEmpty from './__mocks__/dates/expectNotEmpty.json'
import expectIs from './__mocks__/dates/expectIs.json'
import expectisNot from './__mocks__/dates/expectNotEquals.json'
import expectAfter from './__mocks__/dates/expectAfter.json'
import expectBefore from './__mocks__/dates/expectBefore.json'
import expectBetween from './__mocks__/dates/expectBetween.json'

describe('Should match Date', () => {
  it('[Date]: Should cause exception', () => {
    const results = () =>
      new SearchEngine(collection).search([
        {
          field: 'born_at',
          role: 'notExist' as RuleDateOptions,
          type: 'date',
          operator: RuleOperator.AND,
        },
      ])

    expect(results).toThrow('[flexysearch]: Invalid role in Dates')
  })
  it('[Date]: Should find empty dates on collection', () => {
    const results = new SearchEngine(collection).search([
      {
        field: 'born_at',
        role: RuleDateOptions.empty,
        type: 'date',
        operator: RuleOperator.AND,
      },
    ])

    expect(results).toStrictEqual(expectEmpty)
  })
  it('[Date]: Should find not empty dates on collection', () => {
    const data = collection.slice(0, 5)

    const results = new SearchEngine(data).search([
      {
        field: 'born_at',
        role: RuleDateOptions.isNotEmpty,
        type: 'date',
        operator: RuleOperator.AND,
      },
    ])

    expect(results).toStrictEqual(expectNotEmpty)
  })
  it('[Date]: Should find is equals dates on collection', () => {
    const results = new SearchEngine(collection).search([
      {
        field: 'born_at',
        term: '2021-12-27',
        role: RuleDateOptions.equals,
        type: 'date',
        operator: RuleOperator.AND,
      },
    ])

    expect(results).toStrictEqual(expectIs)
  })
  it('[Date]: Should find is not equals dates on collection', () => {
    const data = collection.slice(0, 10)

    const results = new SearchEngine(data).search([
      {
        field: 'born_at',
        term: '2021-12-27',
        role: RuleDateOptions.isNotEquals,
        type: 'date',
        operator: RuleOperator.AND,
      },
    ])

    expect(results).toStrictEqual(expectisNot)
  })
  it('[Date]: Should find after dates on collection', () => {
    const data = collection.slice(0, 10)
    const results = new SearchEngine(data).search([
      {
        field: 'born_at',
        term: '2021-12-01',
        role: RuleDateOptions.isAfter,
        type: 'date',
        operator: RuleOperator.AND,
      },
    ])

    expect(results).toStrictEqual(expectAfter)
  })
  it('[Date]: Should find before dates on collection', () => {
    const data = collection.slice(0, 10)
    const results = new SearchEngine(data).search([
      {
        field: 'born_at',
        term: '2022-05-01',
        role: RuleDateOptions.isBefore,
        type: 'date',
        operator: RuleOperator.AND,
      },
    ])
    expect(results).toStrictEqual(expectBefore)
  })
  it('[Date]: Should find between dates on collection', () => {
    const results = new SearchEngine(babyBornsSequencial).search([
      {
        field: 'born_at',
        term: ['2022-01-02', '2022-01-04'],
        role: RuleDateOptions.isBetween,
        type: 'date',
        operator: RuleOperator.AND,
      },
    ])
    const results2 = new SearchEngine(babyBornsSequencial).search([
      {
        field: 'born_at',
        term: ['2022-01-01', '2022-01-05'],
        role: RuleDateOptions.isBetween,
        type: 'date',
        operator: RuleOperator.AND,
      },
    ])
    expect(results).toStrictEqual(expectBetween)
    expect(babyBornsSequencial).toStrictEqual(results2)
  })
})
