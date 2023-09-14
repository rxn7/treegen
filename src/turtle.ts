const DEG2RAD: number = Math.PI / 180.0

type Transform = {
    x: number
    y: number
    rotation: number
}

export default class Turtle {
    public transform: Transform = {x: 0, y: 0, rotation: 0}
    private transformStack: Array<Transform> = [{x: 0, y: 0, rotation: 0}]

    public rotate(angleDegrees: number): void {
        const t = this.transformStack[this.transformStack.length - 1]
        t.rotation += angleDegrees * DEG2RAD

        this.transform.rotation = t.rotation
    }

    public push(): void {
        this.transformStack.push({x: this.transform.x, y: this.transform.y, rotation: this.transform.rotation})
    }

    public pop(): void {
        this.transform = this.transformStack.pop() as Transform
    }
}
