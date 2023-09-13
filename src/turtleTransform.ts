import { Vector2 } from "./types/vector2.js"

export class TurtleTransform {
    public position: Vector2 = { x: 0, y: 0}
    public rotation: number = 0.0

    public moveForward(distance: number) {
        const angleCos: number = Math.cos(this.rotation)
        const angleSin: number = Math.sin(this.rotation)

        this.position.x -= distance * angleSin;
        this.position.y += distance * angleCos;
    }
}