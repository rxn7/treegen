import Random from "./random.js"
import Turtle from "./turtle.js"
import { RendererSettings } from "./types/settings.js"

const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement
canvas.width = 640
canvas.height = 640

const ctx: CanvasRenderingContext2D = canvas.getContext('2d', {alpha: false, willReadFrequently: false}) as CanvasRenderingContext2D

export namespace Renderer {
    export async function render(sentence: Generator<string> | string, settings: RendererSettings): Promise<void> {
        const random: Random = new Random(settings.seed)
        const turtle: Turtle = new Turtle()

        const x: number = settings.pivotX * canvas.width
        const y: number = settings.pivotY * canvas.height

        ctx.resetTransform()
        ctx.translate(x, y)

        ctx.fillStyle = settings.bgColor
        ctx.fillRect(-x, -y, canvas.width, canvas.height)

        ctx.lineWidth = settings.lineThickness
        ctx.strokeStyle = settings.color

        let length: number = settings.length
        ctx.beginPath()

        for(const symbol of sentence) {
            switch(symbol) {
                case 'G':
                case 'F':
                    ctx.moveTo(turtle.transform.x, -turtle.transform.y)
                    turtle.transform.x -= length * Math.sin(turtle.transform.rotation)
                    turtle.transform.y += length * Math.cos(turtle.transform.rotation)
                    ctx.lineTo(turtle.transform.x, -turtle.transform.y)
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
