export type RegisteredUser = {
    userId: string;
    isGuest: false;
    displayName: string;
};

export type GuestUser = {
    isGuest: true;
    displayName: "Guest";
};

export type CurrentUser = RegisteredUser | GuestUser;

export type UserState = {
    user: CurrentUser;
    loading: boolean;
};

export const userInitialState: UserState = {
    user: { isGuest: true, displayName: "Guest" },
    loading: true,
};
