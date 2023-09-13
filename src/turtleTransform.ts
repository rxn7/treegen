import { Vector2 } from "./types/vector2.js"

export class TurtleTransform {
    public position: Vector2 = { x: 0, y: 0}
    public rotation: number = 0.0

    public moveForward(distance: number) {
        const movement: Vector2 = Vector2.rotated({x: 0.0, y: distance}, this.rotation)
        this.position = Vector2.add(this.position, movement)
    }
}