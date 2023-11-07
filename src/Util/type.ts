export type ChangePropertyType<T, P> = {
    [K in keyof T]-?: P;
};

export type WithNoIntersection<T, U> = T & Partial<ChangePropertyType<U, undefined>>;
