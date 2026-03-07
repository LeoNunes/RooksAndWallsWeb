import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";

vi.mock("Domain/Auth/AuthContext", () => ({
    useAuth: vi.fn(),
}));

vi.mock("Services/Auth/AuthService", () => ({
    getIdToken: vi.fn().mockResolvedValue(null),
    signOut: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("EnvConfig", () => ({
    getEnvConfig: vi.fn().mockReturnValue({ apiBaseUrl: "http://localhost:5000" }),
}));

import { useAuth } from "Domain/Auth/AuthContext";
import Header from "./Header";

describe("Header", () => {
    it("shows sign in and sign up links when guest", () => {
        vi.mocked(useAuth).mockReturnValue({ user: { isGuest: true }, refresh: vi.fn() });
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>,
        );
        expect(screen.getByText("Sign In")).toBeInTheDocument();
        expect(screen.getByText("Sign Up")).toBeInTheDocument();
    });

    it("shows sign out button when authenticated", () => {
        vi.mocked(useAuth).mockReturnValue({
            user: { isGuest: false, userId: "u1" },
            refresh: vi.fn(),
        });
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>,
        );
        expect(screen.getByText("Sign Out")).toBeInTheDocument();
    });
});
