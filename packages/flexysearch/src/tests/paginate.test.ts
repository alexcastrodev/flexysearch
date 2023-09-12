import SearchEngine from '..';
import collection from '../../../../__mocks__/movies.json';

describe('Should match strings', () => {
  it('[String]: Should cause exception', () => {
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
        total: 14,
        lastPage: 3,
        hasPages: true,
        hasTotal: true,
        hasMorePages: true,
        isEmpty: false,
      },
    });
  });
});
