import { TurtleTransform } from "./turtleTransform.js";
import { Vector2 } from "./types/vector2.js";

export class Turtle {
    private transformStack: Array<TurtleTransform> = [new TurtleTransform()]

    public rotate(angleDegrees: number): void {
        this.transformStack[this.transformStack.length-1].rotation += angleDegrees * (Math.PI / 180.0)
    }

    public push(): void {
        this.transformStack.push(new TurtleTransform())
    }

    public pop(): void {
        this.transformStack.pop()
    }

    public createLine(length: number): [Vector2, Vector2] {
        const transform: TurtleTransform = this.transformStack[this.transformStack.length-1]

        const start: Vector2 = this.currentPoint()
        transform.moveForward(length)
        const end: Vector2 = this.currentPoint()

        return [start, end]
    }

    public currentPoint(): Vector2 {
        let rotation: number = 0.0
        let position: Vector2 = {x: 0, y: 0}

        for(const transform of this.transformStack) {
            position = Vector2.add(position, Vector2.rotated(transform.position, rotation))
            rotation += transform.rotation
        }

        return position
    }
}