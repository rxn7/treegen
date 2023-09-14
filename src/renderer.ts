import Random from "./random.js"
import Turtle from "./turtle.js"
import { RendererSettings } from "./types/settings.js"

const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement
canvas.width = 640
canvas.height = 640

const ctx: CanvasRenderingContext2D = canvas.getContext('2d', {alpha: false, willReadFrequently: false}) as CanvasRenderingContext2D

export namespace Renderer {
    export function render(sentence: Generator<string> | string, settings: RendererSettings): void {
        const random = new Random(settings.seed)
        const turtle: Turtle = new Turtle()

        const x = settings.pivotX * canvas.width
        const y = settings.pivotY * canvas.height

        ctx.resetTransform()
        ctx.translate(x, y)

        ctx.fillStyle = settings.bgColor
        ctx.fillRect(-x, -y, canvas.width, canvas.height)

        ctx.lineWidth = settings.width
        ctx.strokeStyle = settings.color

        let length = random.randomized(settings.length, settings.lengthRandomness)
        ctx.beginPath()

        for(const symbol of sentence) {
            switch(symbol) {
                case 'G':
                case 'F':
                    const [sx, sy, ex, ey] = turtle.createLine(length)
                    ctx.moveTo(sx, -sy)
                    ctx.lineTo(ex, -ey)
                    break

                case '+':
                    turtle.rotate(random.randomized(settings.angle, settings.angleRandomness))
                    break

                case '-':
                    turtle.rotate(-random.randomized(settings.angle, settings.angleRandomness))
                    break

                case '(':
                    turtle.push()
                    length *= settings.lengthFalloff
                    break

                case ')':
                    turtle.pop()
                    length /= settings.lengthFalloff
                    break

                case '[':
                    turtle.push()
                    break

                case ']':
                    turtle.pop()
                    break
            }
        }

        ctx.stroke()
    }
}
