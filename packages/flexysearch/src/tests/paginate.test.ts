import SearchEngine, { RuleOperator, RuleStringOptions } from '..';
import collection from '../../../../__mocks__/movies.json';

describe('Paginate', () => {
  it('Should paginate without search', () => {
    const results = new SearchEngine(collection).paginate(1, 5);

    expect(results).toEqual({
      data: [
        { id: 1, title: 'Film 1', year: 2009 },
        { id: 2, title: 'Film 2', year: 2015 },
        { id: 3, title: 'Film 3', year: 2014 },
        { id: 4, title: 'Film 4', year: 2014 },
        { id: 5, title: 'Film 5', year: 2001 },
      ],
      meta: {
        perPage: 5,
        currentPage: 1,
        firstPage: 1,
        offset: 0,
        total: 14,
        lastPage: 3,
        hasPages: true,
        hasTotal: true,
        hasMorePages: true,
        isEmpty: false,
      },
    });
  });
  it('Should paginate without search', () => {
    const results = new SearchEngine(collection).searchQuery([
      {
        field: 'title',
        term: 'film 3',
        role: RuleStringOptions.equals,
        type: 'string',
        operator: RuleOperator.AND,
      },
      {
        field: 'title',
        term: 'film 1',
        role: RuleStringOptions.equals,
        type: 'string',
        operator: RuleOperator.OR,
      },
    ]);

    expect(results.all).toEqual([
      { id: 3, title: 'Film 3', year: 2014 },
      { id: 1, title: 'Film 1', year: 2009 },
    ]);

    const resultsPaginated = results.paginate(1, 1);

    expect(resultsPaginated).toEqual({
      data: [{ id: 3, title: 'Film 3', year: 2014 }],
      meta: {
        perPage: 1,
        currentPage: 1,
        firstPage: 1,
        total: 2,
        offset: 0,
        lastPage: 2,
        hasPages: true,
        hasTotal: true,
        hasMorePages: true,
        isEmpty: false,
      },
    });
    const resultsPaginatedUpdated = results.paginate(1, 2);

    expect(resultsPaginatedUpdated).toEqual({
      data: [
        { id: 3, title: 'Film 3', year: 2014 },
        { id: 1, title: 'Film 1', year: 2009 },
      ],
      meta: {
        perPage: 2,
        currentPage: 1,
        firstPage: 1,
        total: 2,
        offset: 0,
        lastPage: 1,
        hasPages: false,
        hasTotal: true,
        hasMorePages: false,
        isEmpty: false,
      },
    });
  });
  it('Get invalid page', () => {
    const results = new SearchEngine(collection).searchQuery([
      {
        field: 'title',
        term: 'film 3',
        role: RuleStringOptions.equals,
        type: 'string',
        operator: RuleOperator.AND,
      },
      {
        field: 'title',
        term: 'film 1',
        role: RuleStringOptions.equals,
        type: 'string',
        operator: RuleOperator.OR,
      },
    ]);

    const resultsPaginated = results.paginate<{
      id: number;
      title: string;
      year: number;
    }>(2, 2);

    // Check types :)
    expect(resultsPaginated.data.at(0)?.title).toBeDefined();

    expect(resultsPaginated).toEqual({
      data: [],
      meta: {
        perPage: 2,
        currentPage: 2,
        firstPage: 1,
        total: 2,
        lastPage: 1,
        offset: 2,
        hasPages: false,
        hasTotal: true,
        hasMorePages: false,
        isEmpty: false,
      },
    });
  });
});
