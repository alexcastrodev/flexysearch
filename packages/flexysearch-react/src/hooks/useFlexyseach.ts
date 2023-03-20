/* eslint-disable @typescript-eslint/no-explicit-any */
import { FlexysearchHookResult, FlexysearchHookProps } from './../../types/index';
import { useFlexysearchProvider } from '../provider/FlexysearchProvider';
import React from 'react';
import { Kind } from '../state/actions';
import Flexysearch, { IRule } from 'flexysearch';

export default function useFlexysearch<T = unknown>(props?: FlexysearchHookProps<T>): FlexysearchHookResult<T> {
  const { state, dispatch } = useFlexysearchProvider()
  const [rules, setRules] = React.useState<IRule[]>([])
  const updateFilteredData = React.useCallback<(data: any[], searchTerm: string) => void>((data, searchTerm) => {
  const filteredData = searchTerm
    ? data.filter((item: T[]) => Object.values(item)
        .some((value: T) =>
          (value || '')
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      )
    : data;

  dispatch({ kind: Kind.SET_FILTERED_DATA_ACTION, payload: filteredData as T[] });
}, [dispatch]);

  const computedFilteredData = React.useMemo(() => {
    let collection = new Flexysearch(state.data)

    if(state.filtered_data.length) {
      collection = new Flexysearch(state.filtered_data)
    }

    if(rules && rules.length !== 0) {
      collection.search(rules)
    }
    
    return collection
  }, [state.filtered_data, state.data,state.search_term, rules])

  const setData = (data: T[]) => dispatch({ kind: Kind.SET_DATA_ACTION, payload: data })
  
  const updateGlobalSearch = (value: string) => { 
    dispatch({ kind: Kind.UPDATE_GLOBAL_SEARCH_ACTION, payload: value })
    updateFilteredData(state.data, value)
  }

  React.useEffect(() => {
    props?.data && setData(props?.data as T[])
  }, [props?.data])

  return {
    data: state.data as T[],
    filtered_data: computedFilteredData.all as T[],
    setData,
    updateGlobalSearch,
    updateFilterRules: (rules: IRule[]) => setRules(rules),
  }
}