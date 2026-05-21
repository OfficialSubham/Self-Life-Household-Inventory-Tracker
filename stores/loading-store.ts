import { create } from "zustand";

//Defining how loading state will look
export type LoadingState = {
    loading: boolean;
};

//Defining the loading actions
export type LoadingActions = {
    start: () => void;
    end: () => void;
};

//Now my loading store will look something like this
//Will have a loading thing and start and end function
export type LoadingStore = LoadingState & LoadingActions;

export const useLoadingStore = create<LoadingStore>((set) => ({
    loading: false,
    start: () => set({ loading: true }),
    end: () => set({ loading: false }),
}));
