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
});
