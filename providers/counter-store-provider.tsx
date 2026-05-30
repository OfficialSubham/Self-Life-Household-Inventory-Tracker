"use client";
import { CounterStore, createCounterStore } from "@/stores/counter-store";
import { createContext, ReactNode, useContext, useState } from "react";
import { useStore } from "zustand";

//This means whatever create counter store returns will my store
export type CounterStoreApi = ReturnType<typeof createCounterStore>;

export const CounterStoreContext = createContext<CounterStoreApi | undefined>(undefined);

//Defining the type of the CounterStoreProvider props
export interface CounterStoreProviderProps {
    children: ReactNode;
}

export const CounterStoreProvider = ({ children }: CounterStoreProviderProps) => {
    const [store] = useState(() => createCounterStore());
    return (
        <CounterStoreContext.Provider value={store}>
            {children}
        </CounterStoreContext.Provider>
    );
};

export const useCounterStore = <T,>(selector: (store: CounterStore) => T): T => {
    const counterStoreContext = useContext(CounterStoreContext);
    if (!counterStoreContext) {
        throw new Error(`userCounterStore must be used within CounterStoreProvider`);
    }

    return useStore(counterStoreContext, selector);
};

//Made this provider but currently it is complicated
//It is mainly used for SSR so i will learn this later
