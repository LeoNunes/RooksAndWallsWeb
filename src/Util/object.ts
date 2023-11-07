import { ChangePropertyType, WithNoIntersection } from './type';

export function removeKeysFromObject<T extends object, K extends object>(obj: T, keys: ChangePropertyType<K, true>): WithNoIntersection<T, K> {
    const result: any = {};
    const keysToRemove = new Set(Object.keys(keys));
    Object.keys(obj).forEach(key => {
        if (!keysToRemove.has(key)) {
            result[key] = obj[key as keyof T];
        }
    });
    return result as WithNoIntersection<T, K>;
}
