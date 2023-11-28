export function range(from: number, to: number) {
    return [...Array(to - from + 1)].map((_, i) => i + from);
}
