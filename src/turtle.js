import { TurtleTransform } from "./turtleTransform.js";
const DEG2RAD = Math.PI / 180.0;
export default class Turtle {
    constructor() {
        this.transformStack = [new TurtleTransform()];
    }
    rotate(angleDegrees) {
        this.transformStack[this.transformStack.length - 1].rotation += angleDegrees * DEG2RAD;
    }
    push() {
        this.transformStack.push(new TurtleTransform());
    }
    pop() {
        this.transformStack.pop();
    }
    createLine(length) {
        const transform = this.transformStack[this.transformStack.length - 1];
        const start = this.currentPoint();
        transform.moveForward(length);
        const end = this.currentPoint();
        return [start, end];
    }
    currentPoint() {
        let rotation = 0.0;
        let position = { x: 0, y: 0 };
        for (const transform of this.transformStack) {
            const angleCos = Math.cos(rotation);
            const angleSin = Math.sin(rotation);
            position.x += transform.position.x * angleCos - transform.position.y * angleSin;
            position.y += transform.position.x * angleSin + transform.position.y * angleCos;
            rotation += transform.rotation;
        }
        return position;
    }
}
