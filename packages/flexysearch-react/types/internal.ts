import { Kind } from '../src/state/actions';

export type ReducerAction =
  | {
      kind: Kind.SET_DATA_ACTION;
      payload: unknown[];
    }
  | {
      kind: Kind.SET_FILTERED_DATA_ACTION;
      payload: unknown[];
    };
