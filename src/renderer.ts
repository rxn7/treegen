import Random from "./random.js"
import Turtle from "./turtle.js"
import { RendererSettings } from "./types/settings.js"

const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement
canvas.width = 640
canvas.height = 640

const ctx: CanvasRenderingContext2D = canvas.getContext('2d', {alpha: false, willReadFrequently: false}) as CanvasRenderingContext2D
ctx.translate(canvas.width * 0.5, canvas.height)

export namespace Renderer {
    export function render(sentence: Generator<string> | string, settings: RendererSettings): void {
        const random = new Random(settings.seed)
        const turtle: Turtle = new Turtle()

        ctx.fillStyle = settings.bgColor
        ctx.fillRect(-canvas.width * 0.5, -canvas.height, canvas.width, canvas.height)

        ctx.lineWidth = settings.width
        ctx.strokeStyle = settings.color

        let length = random.randomized(settings.length, settings.randomness)
        ctx.beginPath()

        for(const symbol of sentence) {
            switch(symbol) {
                case 'F':
                    const [sx, sy, ex, ey] = turtle.createLine(length)
                    ctx.moveTo(sx, -sy)
                    ctx.lineTo(ex, -ey)
                    break

                case '+':
                    turtle.rotate(random.randomized(settings.angle, settings.randomness))
                    break

                case '-':
                    turtle.rotate(-random.randomized(settings.angle, settings.randomness))
                    break

                case '[':
                    turtle.push()
                    length *= settings.falloff
                    break

                case ']':
                    turtle.pop()
                    length /= settings.falloff
                    break
            }
        }

        ctx.stroke()
    }
}
