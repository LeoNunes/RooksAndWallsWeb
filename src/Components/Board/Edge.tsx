import React, { PropsWithChildren } from 'react';
import './Edge.css';

type EdgeProps = PropsWithChildren<{
    orientation: 'vertical' | 'horizontal',
}>;
export default function Edge(props: EdgeProps) {
    return (
        <div className={`board-edge ${props.orientation}`}>
            { props.children }
        </div>
    );
}
