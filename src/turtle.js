const DEG2RAD = Math.PI / 180.0;
export default class Turtle {
    constructor() {
        this.transform = { x: 0, y: 0, rotation: 0 };
        this.transformStack = [{ x: 0, y: 0, rotation: 0 }];
    }
    rotate(angleDegrees) {
        const t = this.transformStack[this.transformStack.length - 1];
        t.rotation += angleDegrees * DEG2RAD;
        this.transform.rotation = t.rotation;
    }
    push() {
        this.transformStack.push({ x: this.transform.x, y: this.transform.y, rotation: this.transform.rotation });
    }
    pop() {
        this.transform = this.transformStack.pop();
    }
}
