import React from 'react';
import reducer from '../state/reducer';
import { FlexysearchHookProps, FlexysearchHookProvider } from '../../types';
import initialState from '../state/state';
import { Kind } from '../state/actions';
import Flexysearch, { IRule } from 'flexysearch';

export default function FlexysearchProvider<T>({
  children,
  data,
}: React.PropsWithChildren<FlexysearchHookProps<T>>) {
  type DataType = InferDataPropType<typeof data>;

  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [localSearch, setLocalSearch] = React.useState<string | null>(null);
  const [rules, setRules] = React.useState<IRule[]>([]);
  const debounceSearch = React.useDeferredValue(localSearch);

  const getFilteredData = (newRules = rules) => {
    let collection = new Flexysearch(state.data);

    if (localSearch) {
      const filtered = state.data.filter((item: any) => {
        const values = Object.values(item).join(' ').toLowerCase();
        const pattern = new RegExp(localSearch.toLowerCase());
        return pattern.test(values);
      });
      collection = new Flexysearch(filtered);
    }

    if (newRules && newRules.length !== 0) {
      collection.search(newRules);
    }

    return collection;
  };

  const setData = (payload: DataType[]) => {
    dispatch({ kind: Kind.SET_DATA_ACTION, payload });
    dispatch({
      kind: Kind.SET_FILTERED_DATA_ACTION,
      payload,
    });
  };

  React.useEffect(() => {
    data?.length && setData(data as DataType[]);
  }, [data]);

  React.useEffect(() => {
    if (rules.length === 0 && !state.filtered_data.length) return;
    React.startTransition(() => {
      dispatch({
        kind: Kind.SET_FILTERED_DATA_ACTION,
        payload: getFilteredData(rules).all as DataType[],
      });
    });
  }, [rules]);

  React.useEffect(() => {
    if (typeof debounceSearch === 'string') {
      React.startTransition(() => {
        dispatch({
          kind: Kind.SET_FILTERED_DATA_ACTION,
          payload: getFilteredData(rules).all as DataType[],
        });
      });
    }
  }, [debounceSearch]);

  const flexysearch = React.useMemo(() => {
    return {
      data: state.data as DataType[],
      filtered_data: state.filtered_data as DataType[],
      searchValue: localSearch,
      setData,
      rules,
      updateGlobalSearch: (value: string) => {
        setLocalSearch(value);
      },
      updateFilterRules: (rules: IRule[]) => {
        setRules(rules);
      },
    } as FlexysearchHookProvider<DataType>;
  }, [setData, setRules, state, localSearch, rules, data]);

  return (
    <FlexysearchContext.Provider value={flexysearch}>
      {children}
    </FlexysearchContext.Provider>
  );
}

type InferDataPropType<T> = T extends FlexysearchHookProps<infer U>
  ? U
  : unknown;

const FlexysearchContext =
  React.createContext<FlexysearchHookProvider<any> | null>(null);

export function useFlexysearchProvider<T>() {
  const context = React.useContext(
    FlexysearchContext
  ) as FlexysearchHookProvider<T>;
  if (!context) {
    throw new Error(
      'useFlexysearchProvider must be used within a FlexysearchProvider'
    );
  }
  return context;
}
