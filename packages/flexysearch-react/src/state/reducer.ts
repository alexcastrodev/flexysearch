import { ReducerAction } from './../../types/internal';
import { FlexysearchHookState } from './../../types';
import { Kind } from './actions';

const SearchReducer = (
  state: FlexysearchHookState<unknown>,
  action: ReducerAction
) => {
  switch (action.kind) {
    case Kind.SET_DATA_ACTION: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case Kind.SET_FILTERED_DATA_ACTION: {
      return {
        ...state,
        filtered_data: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default SearchReducer;
