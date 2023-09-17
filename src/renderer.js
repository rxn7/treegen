import Random from "./random.js";
import Turtle from "./turtle.js";
const canvas = document.getElementById('canvas');
canvas.width = 640;
canvas.height = 640;
const ctx = canvas.getContext('2d', { alpha: false, willReadFrequently: false });
export var Renderer;
(function (Renderer) {
    async function render(sentence, settings) {
        const random = new Random(settings.seed);
        const turtle = new Turtle();
        const x = settings.pivotX * canvas.width;
        const y = settings.pivotY * canvas.height;
        ctx.resetTransform();
        ctx.translate(x, y);
        ctx.fillStyle = settings.bgColor;
        ctx.fillRect(-x, -y, canvas.width, canvas.height);
        ctx.lineWidth = settings.width;
        ctx.strokeStyle = settings.color;
        let length = settings.length;
        ctx.beginPath();
        for (const symbol of sentence) {
            switch (symbol) {
                case 'G':
                case 'F':
                    ctx.moveTo(turtle.transform.x, -turtle.transform.y);
                    turtle.transform.x -= length * Math.sin(turtle.transform.rotation);
                    turtle.transform.y += length * Math.cos(turtle.transform.rotation);
                    ctx.lineTo(turtle.transform.x, -turtle.transform.y);
                    break;
                case '+':
                    turtle.rotate(random.randomized(settings.angle, settings.angleRandomness));
                    break;
                case '-':
                    turtle.rotate(-random.randomized(settings.angle, settings.angleRandomness));
                    break;
                case '(':
                    turtle.push();
                    length *= settings.lengthFalloff;
                    break;
                case ')':
                    turtle.pop();
                    length /= settings.lengthFalloff;
                    break;
                case '[':
                    turtle.push();
                    break;
                case ']':
                    turtle.pop();
                    break;
            }
        }
        ctx.stroke();
    }
    Renderer.render = render;
})(Renderer || (Renderer = {}));
