import SearchEngine from '..';
import { RuleOperator, RuleStringOptions } from '../../interfaces';
import collection from '../../__mocks__/movies.json';

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
        term: 'film 3',
        role: RuleStringOptions.contains,
        type: 'string',
        operator: RuleOperator.AND
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

    expect(results).toStrictEqual([
      {
        id: 2,
        title: 'Film 2',
        year: 2015
      },
      {
        id: 3,
        title: 'Film 3',
        year: 2014
      },
      {
        id: 4,
        title: 'Film 4',
        year: 2014
      },
      {
        id: 5,
        title: 'Film 5',
        year: 2001
      },
      {
        id: 6,
        title: 'Film 6',
        year: 2000
      },
      {
        id: 7,
        title: 'Film 7',
        year: 2009
      },
      {
        id: 8,
        title: 'Film 8',
        year: 2015
      },
      {
        id: 9,
        title: 'Film 9',
        year: 2020
      }
    ]);
  });
});
