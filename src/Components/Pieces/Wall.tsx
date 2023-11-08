import React, { PropsWithChildren } from 'react';
import './Wall.css';

type WallProps = PropsWithChildren<{}>;
export function Wall(props: WallProps) {
    return <div className='wall'>{props.children}</div>;
}
