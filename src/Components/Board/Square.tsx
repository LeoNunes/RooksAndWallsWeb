import type { PropsWithChildren } from "react";
import "./Square.css";

type SquareProps = PropsWithChildren<{
    color: "black" | "white";
}>;
export default function Square(props: SquareProps) {
    const { color, children } = props;

    return <div className={`board-square ${color}`}>{children}</div>;
}
