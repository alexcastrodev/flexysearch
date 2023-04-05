import { IRule } from 'flexysearch';

export interface FlexysearchHookProvider<T> {
  data: T[];
  filtered_data: T[];
  setData: (data: T[]) => void;
  updateGlobalSearch: (value: string) => void;
  updateFilterRules: (rules: IRule[]) => void;
  searchValue: string;
  rules: IRule[];
}

export interface FlexysearchHookProps<T> {
  data?: T[];
}

export interface FlexysearchHookState<T> {
  data: T[];
  filtered_data: T[];
}
