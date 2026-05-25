import { create } from "zustand";

type User = {
    email: string;
    _id: number;
    name: string;
    householdId: number | null;
};

export type UserState = {
    user: User | null;
    members: User[] | null;
    isOwner: boolean;
};

export type UserActions = {
    setUser: (user: User) => void;
    setMembers: (users: User[]) => void;
    setIsOwner: (isOwner: boolean) => void;
};

export type UserStore = UserState & UserActions;

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    members: null,
    isOwner: false,
    setUser: (user) => set(() => ({ user })),
    setMembers: (users) => set(() => ({ members: users })),
    setIsOwner: (isOwner) => set(() => ({ isOwner })),
}));
