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
