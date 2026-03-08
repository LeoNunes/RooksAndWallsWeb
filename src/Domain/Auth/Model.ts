export type AuthUser = {
    userId: string;
    isGuest: false;
};

export type GuestUser = {
    isGuest: true;
};

export type CurrentUser = AuthUser | GuestUser;

export type AuthState = {
    user: CurrentUser | null; // null = loading
};

export const authInitialState: AuthState = {
    user: null,
};
