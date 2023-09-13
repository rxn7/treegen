export type Vector2 = {
    x: number,
    y: number
}

export namespace Vector2 {
    export const add = (v1: Vector2, v2: Vector2): Vector2 => { return {x: v1.x + v2.x, y: v1.y + v2.y} }
    export const sub = (v1: Vector2, v2: Vector2): Vector2 => { return {x: v1.x - v2.x, y: v1.y - v2.y} }

    export function rotated(v: Vector2, angle: number): Vector2 {
        const angleCos: number = Math.cos(angle)
        const angleSin: number = Math.sin(angle)
        return {
            x: v.x * angleCos - v.y * angleSin,
            y: v.x * angleSin + v.y * angleCos
        }
    }
}