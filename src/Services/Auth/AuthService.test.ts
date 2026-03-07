import { describe, expect, it, vi } from "vitest";

vi.mock("@aws-amplify/auth", () => ({
    fetchAuthSession: vi.fn().mockResolvedValue({
        tokens: { idToken: { toString: () => "mock-token" } },
    }),
    getCurrentUser: vi.fn().mockResolvedValue({ userId: "user-123" }),
}));

import { getCurrentUserInfo, getIdToken } from "./AuthService";

describe("AuthService", () => {
    it("getIdToken returns token from session", async () => {
        expect(await getIdToken()).toBe("mock-token");
    });

    it("getCurrentUserInfo returns AuthUser when signed in", async () => {
        const user = await getCurrentUserInfo();
        expect(user).toEqual({ userId: "user-123", isGuest: false });
    });
});
