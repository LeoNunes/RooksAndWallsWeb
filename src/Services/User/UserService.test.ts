import { describe, expect, it, vi } from "vitest";

vi.mock("@aws-amplify/auth", () => ({
    fetchAuthSession: vi.fn().mockResolvedValue({
        tokens: { idToken: { toString: () => "mock-token" } },
    }),
}));

import { getAuthToken } from "./UserService";

describe("UserService", () => {
    it("getAuthToken returns token from session", async () => {
        expect(await getAuthToken()).toBe("mock-token");
    });
});
