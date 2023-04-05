import { act, renderHook, waitFor } from '@testing-library/react';

import FlexysearchProvider, {
  useFlexysearchProvider,
} from '../provider/FlexysearchProvider';
import tableDataMock from '../../../../__mocks__/movies.json';
import { RuleOperator, RuleStringOptions } from 'flexysearch';

describe('FlexysearchReact', () => {
  it('should mount Hook', () => {
    const { result } = renderHook(() => useFlexysearchProvider(), {
      wrapper: (props) => <FlexysearchProvider data={[]} {...props} />,
    });

    expect(result.current.data).toEqual([]);
  });
});

describe('FlexysearchReact - Mount data', () => {
  it('should mount with Hook with Collection', () => {
    const dataState = [{ id: 1, name: 'test' }];
    const { result } = renderHook(() => useFlexysearchProvider(), {
      wrapper: (props) => <FlexysearchProvider data={dataState} {...props} />,
    });
    expect(result.current.data).toEqual(dataState);
  });
  it('Update collection', () => {
    const stateToUpdate = [{ id: 1, name: 'test' }];
    const { result } = renderHook(() => useFlexysearchProvider(), {
      wrapper: (props) => <FlexysearchProvider {...props} />,
    });

    act(() => {
      result.current.setData(stateToUpdate);
    });

    expect(result.current.data).toEqual(stateToUpdate);
  });
});

describe('FlexysearchReact - Filters', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('Search by term', () => {
    const dataToFindSearch = [{ id: 14, title: 'Film empty', year: '' }];
    const { result } = renderHook(() => useFlexysearchProvider(), {
      wrapper: (props) => (
        <FlexysearchProvider data={tableDataMock} {...props} />
      ),
    });

    act(() => {
      result.current.updateGlobalSearch('Film empty');
    });

    expect(result.current.filtered_data).toEqual(dataToFindSearch);
  });
  it('Search by Flexysearch integration', () => {
    const dataToFindSearch = [{ id: 14, title: 'Film empty', year: '' }];
    const { result } = renderHook(() => useFlexysearchProvider(), {
      wrapper: (props) => (
        <FlexysearchProvider data={tableDataMock} {...props} />
      ),
    });

    act(() => {
      result.current.updateFilterRules([
        {
          field: 'title',
          operator: RuleOperator.AND,
          term: 'Film empty',
          type: 'string',
          role: RuleStringOptions.equals,
          caseSensitive: false,
        },
      ]);
    });

    waitFor(() => {
      expect(result.current.filtered_data).toEqual(dataToFindSearch);
    });
  });
  it('Search by Flexysearch integration with global search', () => {
    const { result } = renderHook(() => useFlexysearchProvider(), {
      wrapper: (props) => (
        <FlexysearchProvider data={tableDataMock} {...props} />
      ),
    });

    act(() => {
      result.current.updateFilterRules([
        {
          field: 'title',
          operator: RuleOperator.AND,
          term: 'Film empty',
          type: 'string',
          role: RuleStringOptions.equals,
          caseSensitive: false,
        },
      ]);

      result.current.updateGlobalSearch('no match');
      expect(result.current.filtered_data).toEqual([]);
    });

    // Clear search term
    act(() => {
      result.current.updateGlobalSearch('');
    });

    waitFor(() => {
      expect(result.current.filtered_data).toEqual(tableDataMock);
    });
  });
  it('Integration flexysearch with reverse logic with search term', () => {
    const dataToFindSearch = [{ id: 14, title: 'Film empty', year: '' }];
    const { result } = renderHook(() => useFlexysearchProvider(), {
      wrapper: (props) => (
        <FlexysearchProvider data={tableDataMock} {...props} />
      ),
    });

    act(() => {
      result.current.updateGlobalSearch('Film 1');

      result.current.updateFilterRules([
        {
          field: 'title',
          operator: RuleOperator.AND,
          term: 'Film empty',
          type: 'string',
          role: RuleStringOptions.equals,
          caseSensitive: false,
        },
      ]);
    });

    waitFor(() => {
      expect(result.current.filtered_data).toEqual([]);
    });

    // Clear search term
    act(() => {
      result.current.updateGlobalSearch('');
    });

    waitFor(() => {
      expect(result.current.filtered_data).toEqual(dataToFindSearch);
    });
  });
});

describe('Edges cases', () => {
  it('Should return empty array when not match', () => {
    const searchTerm = 'aaaaa';
    const data = [{ name: 'test', mass: 100 }];
    const { result } = renderHook(() => useFlexysearchProvider(), {
      wrapper: (props) => <FlexysearchProvider data={data} {...props} />,
    });

    act(() => {
      result.current.updateGlobalSearch(searchTerm);
    });

    expect(result.current.filtered_data).toEqual([]);
  });
});
