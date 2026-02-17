import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Rooks And Walls heading", () => {
    render(<App />);
    const heading = screen.getByText(/rooks and walls/i);
    expect(heading).toBeInTheDocument();
});
