import type { PropsWithChildren } from "react";
import "./Wall.css";

// biome-ignore lint/complexity/noBannedTypes: I need an empty object
type WallProps = PropsWithChildren<{}>;
export function Wall(props: WallProps) {
    return <div className="wall">{props.children}</div>;
}
