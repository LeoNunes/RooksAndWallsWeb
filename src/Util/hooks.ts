import { Reducer, useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { AsyncAction, AsyncDispatch } from '../Domain/Common/DataTypes';

export function useAsyncReducer<StateType, ActionType extends object>(
    reducer: Reducer<StateType, ActionType>,
    initialValue: StateType,
): [StateType, AsyncDispatch<ActionType, StateType>] {
    const [baseState, baseDispatch] = useReducer(reducer, initialValue);

    const intermediateState = useRef(baseState);
    intermediateState.current = baseState;

    const asyncDispatch = useCallback(
        async (action: AsyncAction<ActionType, StateType>) => {
            function getState(): StateType {
                return intermediateState.current;
            }

            function dispatchAndUpdateIntermediateState(action: ActionType): void {
                intermediateState.current = reducer(intermediateState.current, action);
                baseDispatch(action);
            }

            if (typeof action === 'function') {
                await action(asyncDispatch, getState);
            } else {
                dispatchAndUpdateIntermediateState(action);
            }
        },
        [reducer, intermediateState],
    );

    return [baseState, asyncDispatch];
}

export function useGetter<S>(value: S): () => S {
    const valueRef = useRef(value);
    valueRef.current = value;
    return useCallback(() => valueRef.current, [valueRef]);
}

export function useGetState<S>(
    initialState: S | (() => S),
): [() => S, React.Dispatch<React.SetStateAction<S>>] {
    const [state, setState] = useState(initialState);
    const getState = useGetter(state);

    return [getState, setState];
}

function preloadImage(src: string) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = function () {
            resolve(img);
        };
        img.onerror = img.onabort = function () {
            reject(src);
        };
        img.src = src;
    });
}

//From: https://stackoverflow.com/questions/42615556/how-to-preload-images-in-react-js
export function useImagePreloader(imageList: string[]) {
    const [imagesPreloaded, setImagesPreloaded] = useState<boolean>(false);

    useEffect(() => {
        let isCancelled = false;

        async function effect() {
            if (isCancelled) {
                return;
            }

            const imagesPromiseList: Promise<any>[] = [];
            for (const i of imageList) {
                imagesPromiseList.push(preloadImage(i));
            }

            await Promise.all(imagesPromiseList);

            if (isCancelled) {
                return;
            }

            setImagesPreloaded(true);
        }

        effect();

        return () => {
            isCancelled = true;
        };
    }, [imageList]);

    return { imagesPreloaded };
}
