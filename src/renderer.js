import Random from "./random.js";
import Turtle from "./turtle.js";
const canvas = document.getElementById('canvas');
canvas.width = 640;
canvas.height = 640;
const ctx = canvas.getContext('2d', { alpha: false, willReadFrequently: false });
ctx.translate(canvas.width * 0.5, canvas.height);
export var Renderer;
(function (Renderer) {
    function render(sentence, settings) {
        const random = new Random(settings.seed);
        const turtle = new Turtle();
        ctx.fillStyle = settings.bgColor;
        ctx.fillRect(-canvas.width * 0.5, -canvas.height, canvas.width, canvas.height);
        ctx.lineWidth = settings.width;
        ctx.strokeStyle = settings.color;
        let length = random.randomized(settings.length, settings.randomness);
        for (const symbol of sentence) {
            switch (symbol) {
                case 'F':
                    const [start, end] = turtle.createLine(length);
                    ctx.beginPath();
                    ctx.moveTo(start.x, -start.y);
                    ctx.lineTo(end.x, -end.y);
                    ctx.stroke();
                    break;
                case '+':
                    turtle.rotate(random.randomized(settings.angle, settings.randomness));
                    break;
                case '-':
                    turtle.rotate(-random.randomized(settings.angle, settings.randomness));
                    break;
                case '[':
                    turtle.push();
                    length *= settings.fallof;
                    break;
                case ']':
                    turtle.pop();
                    length /= settings.fallof;
                    break;
            }
        }
    }
    Renderer.render = render;
})(Renderer || (Renderer = {}));
