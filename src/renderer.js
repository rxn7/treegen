import Random from "./random.js";
import Turtle from "./turtle.js";
const canvas = document.getElementById('canvas');
canvas.width = 640;
canvas.height = 640;
const ctx = canvas.getContext('2d', { alpha: false, willReadFrequently: false });
export var Renderer;
(function (Renderer) {
    function render(sentence, settings) {
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
        let length = random.randomized(settings.length, settings.randomness);
        ctx.beginPath();
        for (const symbol of sentence) {
            switch (symbol) {
                case 'G':
                case 'F':
                    const [sx, sy, ex, ey] = turtle.createLine(length);
                    ctx.moveTo(sx, -sy);
                    ctx.lineTo(ex, -ey);
                    break;
                case '+':
                    turtle.rotate(random.randomized(settings.angle, settings.randomness));
                    break;
                case '-':
                    turtle.rotate(-random.randomized(settings.angle, settings.randomness));
                    break;
                case '(':
                    turtle.push();
                    length *= settings.falloff;
                    break;
                case ')':
                    turtle.pop();
                    length /= settings.falloff;
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
