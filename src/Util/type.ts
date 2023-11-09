export type NonEmptyArray<T> = [T, ...T[]];
export type ReadonlyNonEmptyArray<T> = readonly [T, ...T[]];

export type Primitives = undefined | null | boolean | string | number | bigint | symbol | Function;

export type Immutable<T> = T extends Primitives
    ? T
    : T extends NonEmptyArray<infer A>
    ? ImmutableNonEmptyArray<A>
    : T extends Array<infer B>
    ? ImmutableArray<B>
    : T extends Map<infer C, infer D>
    ? ImmutableMap<C, D>
    : T extends Set<infer E>
    ? ImmutableSet<E>
    : ImmutableObject<T>;

export type ImmutableNonEmptyArray<T> = ReadonlyNonEmptyArray<Immutable<T>>;
export type ImmutableArray<T> = ReadonlyArray<Immutable<T>>;
export type ImmutableMap<K, V> = ReadonlyMap<Immutable<K>, Immutable<V>>;
export type ImmutableSet<T> = ReadonlySet<Immutable<T>>;
export type ImmutableObject<T> = { readonly [K in keyof T]: Immutable<T[K]> };

export type ChangePropertyType<T, P> = {
    [K in keyof T]-?: P;
};

export type WithNoIntersection<T, U> = T & Partial<ChangePropertyType<U, undefined>>;

export function isArrayOf<T>(obj: any, checkItem: (item: any) => item is T): obj is T[] {
    return Array.isArray(obj) && obj.every(item => checkItem(item));
}
