const DEG2RAD: number = Math.PI / 180.0

type TurtleTransform = {
    x: number
    y: number
    rotation: number
}

export default class Turtle {
    private transformStack: Array<TurtleTransform> = [{x: 0, y: 0, rotation: 0}]

    public rotate(angleDegrees: number): void {
        this.transformStack[this.transformStack.length-1].rotation += angleDegrees * DEG2RAD
    }

    public push(): void {
        this.transformStack.push({x: 0, y: 0, rotation: 0})
    }

    public pop(): void {
        this.transformStack.pop()
    }

    public createLine(length: number): [number, number, number, number] {
        const transform: TurtleTransform = this.transformStack[this.transformStack.length-1]

        const [sx, sy] = this.currentPoint()
        transform.x -= length * Math.sin(transform.rotation)
        transform.y += length * Math.cos(transform.rotation)
        const [ex, ey] = this.currentPoint()

        return [sx, sy, ex, ey]
    }

    public currentPoint(): [number, number] {
        let rotation: number = 0.0
        let x: number = 0
        let y: number = 0
        let angleCos: number = 0
        let angleSin: number = 0

        for(const transform of this.transformStack) {
            angleCos = Math.cos(rotation)
            angleSin = Math.sin(rotation)

            x += transform.x * angleCos - transform.y * angleSin
            y += transform.x * angleSin + transform.y * angleCos
            rotation += transform.rotation
        }

        return [x, y]
    }
}
