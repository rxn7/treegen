export class TurtleTransform {
    constructor() {
        this.position = { x: 0, y: 0 };
        this.rotation = 0.0;
    }
    moveForward(distance) {
        const angleCos = Math.cos(this.rotation);
        const angleSin = Math.sin(this.rotation);
        this.position.x -= distance * angleSin;
        this.position.y += distance * angleCos;
    }
}
