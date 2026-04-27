import { create } from "zustand";

type User = {
    email: string;
    id: number;
    name: string;
};

export type UserState = {
    user: User | null;
};

export type UserActions = {
    setUser: (user: User) => void;
};

export type UserStore = UserState & UserActions;

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set(() => ({ user })),
}));
