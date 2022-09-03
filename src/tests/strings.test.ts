import SearchEngine from '..';
import { RuleOperator, RuleStringOptions } from '../../interfaces';
import collection from '../../__mocks__/movies.json';
import expectedNotContains from './__mocks__/expectedNotContains.json';
import expectedEquals from './__mocks__/expectedEquals.json';

describe('Should match strings', () => {
  it('[String]: Should cause exception', () => {
    const results = () =>
      new SearchEngine(collection).search([
        {
          field: 'title',
          term: 'film 3',
          role: 'notExist' as RuleStringOptions,
          type: 'string',
          operator: RuleOperator.AND
        }
      ]);

    expect(results).toThrow('[flexysearch]: Invalid role in String');
  });

  it('[String]: Contains', () => {
    const results = new SearchEngine(collection).search([
      {
        field: 'title',
        term: 'film 3',
        role: RuleStringOptions.contains,
        type: 'string',
        operator: RuleOperator.AND
      },
      {
        field: 'year',
        term: '2014',
        role: RuleStringOptions.contains,
        type: 'string',
        operator: RuleOperator.AND
      }
    ]);

    const results2 = new SearchEngine(collection).search([
      {
        field: 'title',
        term: 'Film 3',
        role: RuleStringOptions.contains,
        type: 'string',
        operator: RuleOperator.AND,
        caseSensitive: true
      },
      {
        field: 'year',
        term: '2000',
        role: RuleStringOptions.contains,
        type: 'string',
        operator: RuleOperator.OR
      }
    ]);

    expect(results).toStrictEqual([
      {
        id: 3,
        title: 'Film 3',
        year: 2014
      }
    ]);

    expect(results2).toStrictEqual([
      { id: 3, title: 'Film 3', year: 2014 },
      { id: 6, title: 'Film 6', year: 2000 }
    ]);
  });
  it('[String]: Not Contains', () => {
    const results = new SearchEngine(collection).search([
      {
        field: 'title',
        term: 'Film 1',
        role: RuleStringOptions.notContains,
        type: 'string',
        operator: RuleOperator.AND
      }
    ]);

    expect(results).toStrictEqual(expectedNotContains);
  });
  it('[String]: Equals', () => {
    const resultsCaseInsentive = new SearchEngine(collection).search([
      {
        field: 'title',
        role: RuleStringOptions.equals,
        term: 'fiLM 1',
        type: 'string',
        operator: RuleOperator.AND
      }
    ]);

    expect(resultsCaseInsentive.length).toBe(1);

    const results_caseSentive = new SearchEngine(collection).search([
      {
        field: 'title',
        role: RuleStringOptions.equals,
        term: 'Film 1',
        type: 'string',
        operator: RuleOperator.AND,
        caseSensitive: true
      }
    ]);
    const resultsCaseSentiveFailed = new SearchEngine(collection).search([
      {
        field: 'title',
        role: RuleStringOptions.equals,
        term: 'film 1',
        type: 'string',
        operator: RuleOperator.AND,
        caseSensitive: true
      }
    ]);
    expect(results_caseSentive.length).toBe(1);
    expect(resultsCaseSentiveFailed.length).toBe(0);
    expect(results_caseSentive).toStrictEqual(expectedEquals);
  });
});
