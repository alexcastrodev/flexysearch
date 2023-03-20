import React from "react"
import reducer from "../state/reducer"
import { FlexysearchHookProvider } from "../../types"
import initialState from "../state/state"

const FlexysearchContext = React.createContext<FlexysearchHookProvider>({} as FlexysearchHookProvider)

export default function FlexysearchProvider({children}: React.PropsWithChildren) {
    const [state, dispatch] = React.useReducer(reducer, initialState)

    return (
        <FlexysearchContext.Provider value={{ state, dispatch }}>{children}</FlexysearchContext.Provider>
    )
}

export const useFlexysearchProvider = () => React.useContext(FlexysearchContext)