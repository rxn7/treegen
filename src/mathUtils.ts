export namespace MathUtils {
    export function moveForward(x: number, y: number, distance: number, rotation: number): [number, number] {
        return [
            x - distance * Math.sin(rotation),
            y + distance * Math.cos(rotation)
        ]
    }
}
