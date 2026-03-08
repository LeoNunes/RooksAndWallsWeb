export type UserProfile = {
    userId: string;
    displayName: string;
};

export type RegistrationStatus = "registered" | "unregistered";

export type RegisterUserResult = { success: true } | { success: false; error: "name-taken" | "server-error" };
