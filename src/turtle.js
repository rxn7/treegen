const DEG2RAD = Math.PI / 180.0;
export default class Turtle {
    constructor() {
        this.transformStack = [{ x: 0, y: 0, rotation: 0 }];
    }
    rotate(angleDegrees) {
        this.transformStack[this.transformStack.length - 1].rotation += angleDegrees * DEG2RAD;
    }
    push() {
        this.transformStack.push({ x: 0, y: 0, rotation: 0 });
    }
    pop() {
        this.transformStack.pop();
    }
    createLine(length) {
        const transform = this.transformStack[this.transformStack.length - 1];
        const [sx, sy] = this.currentPoint();
        transform.x -= length * Math.sin(transform.rotation);
        transform.y += length * Math.cos(transform.rotation);
        const [ex, ey] = this.currentPoint();
        return [sx, sy, ex, ey];
    }
    currentPoint() {
        let rotation = 0.0;
        let x = 0;
        let y = 0;
        let angleCos = 0;
        let angleSin = 0;
        for (const transform of this.transformStack) {
            angleCos = Math.cos(rotation);
            angleSin = Math.sin(rotation);
            x += transform.x * angleCos - transform.y * angleSin;
            y += transform.x * angleSin + transform.y * angleCos;
            rotation += transform.rotation;
        }
        return [x, y];
    }
}
