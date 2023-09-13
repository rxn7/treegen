import { Branch } from "./types/branch.js"

const canvas: HTMLCanvasElement = document.createElement('canvas')
canvas.width = 640
canvas.height = 640
document.body.appendChild(canvas)

const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D

export namespace Renderer {
    export function render(branches: Array<Branch>): void {
        ctx.clearRect(0, 0, 640, 640)

        ctx.translate(canvas.width * 0.5, canvas.height)
        ctx.lineWidth = 1.0
        ctx.strokeStyle = '#000'
        for(const branch of branches) {
            ctx.beginPath()
            ctx.moveTo(branch.start.x, -branch.start.y)
            ctx.lineTo(branch.end.x, -branch.end.y)
            ctx.stroke()
        }
    }
}