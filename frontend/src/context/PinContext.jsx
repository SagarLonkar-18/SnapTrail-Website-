import { createContext } from "react";

const PinContext = createContext();

export const PinProvider = ({children}) => {
    return <PinContext.Provider value={{}}>
        {children}
    </PinContext.Provider>
}

export const PinData = () => useContext(PinContext);