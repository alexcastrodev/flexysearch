import SearchEngine from '..';
import { RuleNumberOptions, RuleOperator } from '../../interfaces';
import collection from '../../__mocks__/movies.json';

describe('Should match number', () => {
  it('[Number]: Should cause exception', () => {
    const results = () =>
      new SearchEngine(collection).search([
        {
          field: 'title',
          term: 'film 3',
          role: 'notExist' as RuleNumberOptions,
          type: 'number',
          operator: RuleOperator.AND
        }
      ]);

    expect(results).toThrow('[flexysearch]: Invalid role in Numbers');
  });
  it('[Number]: Contains', () => {
    const results = new SearchEngine(collection).search([
      {
        field: 'title',
        term: 'film 3',
        role: RuleNumberOptions.contains,
        type: 'number',
        operator: RuleOperator.AND
      },
      {
        field: 'year',
        term: 2014,
        role: RuleNumberOptions.contains,
        type: 'number',
        operator: RuleOperator.AND
      }
    ]);

    expect(results).toStrictEqual([
      {
        id: 3,
        title: 'Film 3',
        year: 2014
      }
    ]);
  });
  it('[Number]: Not Contains', () => {
    const results = new SearchEngine(collection).search([
      {
        field: 'year',
        term: 2014,
        role: RuleNumberOptions.notContains,
        type: 'number',
        operator: RuleOperator.AND
      }
    ]);

    expect(results).toStrictEqual([
      {
        id: 1,
        title: 'Film 1',
        year: 2009
      },
      {
        id: 2,
        title: 'Film 2',
        year: 2015
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
      },
      {
        id: 10,
        title: 'Film 10',
        year: 1997
      },
      {
        id: 11,
        title: 'Film 11',
        year: 1992
      },
      {
        id: 12,
        title: 'Film 12',
        year: 1990
      }
    ]);
  });
  it('[Number]: equals', () => {
    const results = new SearchEngine(collection).search([
      {
        field: 'year',
        term: 2014,
        role: RuleNumberOptions.equals,
        type: 'number',
        operator: RuleOperator.AND
      }
    ]);

    expect(results).toStrictEqual([
      {
        id: 3,
        title: 'Film 3',
        year: 2014
      },
      {
        id: 4,
        title: 'Film 4',
        year: 2014
      }
    ]);
  });
});
