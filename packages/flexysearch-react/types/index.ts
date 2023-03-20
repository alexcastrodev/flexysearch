import { IRule } from "flexysearch"
import { ReducerAction } from "./internal"

export interface FlexysearchData<T = unknown> {
    data: T[]
}

export interface FlexysearchHookResult<T = unknown> extends FlexysearchData<T> {
    setData: (data: T[]) => void
    updateGlobalSearch: (value: string) => void
    updateFilterRules: (rules: IRule[]) => void
    filtered_data: T[]
    data: T[]
}

export interface FlexysearchHookProps<T = unknown> {
    data?: T[]
}

export interface FlexysearchHookState<T = unknown> {
    data: T[]
    filtered_data: T[]
    search_term: string
}

export interface FlexysearchHookProvider {
    state: FlexysearchHookState
    dispatch: React.Dispatch<ReducerAction>
}

