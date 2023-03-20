import { act, renderHook } from '@testing-library/react';

import useFlexysearch from './useFlexyseach';
import FlexysearchProvider from '../provider/FlexysearchProvider';
import tableDataMock from '../../../../__mocks__/movies.json'
import { RuleOperator, RuleStringOptions } from 'flexysearch';

describe('FlexysearchReact', () => {
  it('should mount Hook', () => {
    const { result } = renderHook(() => useFlexysearch(), { wrapper: FlexysearchProvider })
    expect(result.current.data).toEqual([])
  });
});

describe('FlexysearchReact - Mount data', () => {
  it('should mount with Hook with Collection', () => {
    const dataState = [{ id: 1, name: 'test' }]
    const { result } = renderHook(() => useFlexysearch({ data: dataState }), { wrapper: FlexysearchProvider })
    expect(result.current.data).toEqual(dataState)
  });
  it('Update collection', () => {
    const stateToUpdate = [{ id: 1, name: 'test' }]
    const { result } = renderHook(() => useFlexysearch(), { wrapper: FlexysearchProvider })

    act(() => {
      result.current.setData(stateToUpdate)
    })

    expect(result.current.data).toEqual(stateToUpdate)
  });
})

describe('FlexysearchReact - Filters', () => {
  it('Search by term', () => {
    const dataToFindSearch = [{id: 14, title: "Film empty", year: ""}]
    const { result } = renderHook(() => useFlexysearch({ data: tableDataMock }), { wrapper: FlexysearchProvider })

    act(() => {
      result.current.updateGlobalSearch('Film empty')
    })
    
    expect(result.current.filtered_data).toEqual(dataToFindSearch)
  });
    it('Search by Flexysearch integration', () => {
    const dataToFindSearch = [{id: 14, title: "Film empty", year: ""}]
    const { result } = renderHook(() => useFlexysearch({ data: tableDataMock }), { wrapper: FlexysearchProvider })

    act(() => {
      result.current.updateFilterRules([
        {
          field: 'title',
          operator: RuleOperator.AND,
          term: 'Film empty',
          type: 'string',
          role: RuleStringOptions.equals,
          caseSensitive: false
        }
      ])
    })
    
    expect(result.current.filtered_data).toEqual(dataToFindSearch)
  });
   it('Search by Flexysearch integration with global search', () => {
    const dataToFindSearch = [{id: 14, title: "Film empty", year: ""}]
    const { result } = renderHook(() => useFlexysearch({ data: tableDataMock }), { wrapper: FlexysearchProvider })

    act(() => {
      result.current.updateFilterRules([
        {
          field: 'title',
          operator: RuleOperator.AND,
          term: 'Film empty',
          type: 'string',
          role: RuleStringOptions.equals,
          caseSensitive: false
        }
      ])

      result.current.updateGlobalSearch('Film 1')
    })
    
    expect(result.current.filtered_data).toEqual([])


    // Clear search term
    act(() => {
      result.current.updateGlobalSearch('')
    })

    expect(result.current.filtered_data).toEqual(dataToFindSearch)
  });
  it('Integration flexysearch with reverse logic with search term', () => {
    const dataToFindSearch = [{id: 14, title: "Film empty", year: ""}]
    const { result } = renderHook(() => useFlexysearch({ data: tableDataMock }), { wrapper: FlexysearchProvider })

    act(() => {
      result.current.updateGlobalSearch('Film 1')
      
      result.current.updateFilterRules([
        {
          field: 'title',
          operator: RuleOperator.AND,
          term: 'Film empty',
          type: 'string',
          role: RuleStringOptions.equals,
          caseSensitive: false
        }
      ])
    })
    
    expect(result.current.filtered_data).toEqual([])


    // Clear search term
    act(() => {
      result.current.updateGlobalSearch('')
    })

    expect(result.current.filtered_data).toEqual(dataToFindSearch)
  });
})