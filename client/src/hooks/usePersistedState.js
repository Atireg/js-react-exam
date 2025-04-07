import { useState } from "react";

// Discalimer: DO NOT USE THIS FOR HIGH FREQUENCY OPERATIONS! IT IS DEMANDING... FOR HIGH-FREQUENCY OPERATIONS --> MAYBE INTRODUCE THROTTLING

export default function usePersistedState(stateKey, initialState){
    const [state, setState] = useState(() => {
        const persistedStateJson = localStorage.getItem(stateKey);

        if(!persistedStateJson){
            return typeof initialState === 'function'
            ? initialState()
            : initialState;
        };

        const persistedStateData = JSON.parse(persistedStateJson);

        return persistedStateData;
    });

    const setPersistedState = (input) => {
       
        const data = typeof input === 'function'
        ? input(state)
        : input;

        const persistedData = JSON.stringify(data);

        localStorage.setItem(stateKey, persistedData);

        setState(data);
    }

    return [
        state,
        setPersistedState,
    ]
}