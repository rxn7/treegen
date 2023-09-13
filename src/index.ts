import { Generator } from "./generator.js";
import { Renderer } from "./renderer.js";
import { Sentence } from "./types/sentence.js";
import { Symbol } from "./types/symbol.js";

const generator: Generator = new Generator({
    seed: +new Date(),
    axiom: ['X'],
    rules: new Map<Symbol, Sentence>([
        ['X', ['F', '-', '[', '[', 'X', ']', '+', 'X', ']', '+', 'F', '[', '+', 'F', 'X', ']', '-', 'X']]
    ]),
    iterations: 5,
    branchesSettings: {
        color: '#ff0000',
        width: 1,
        length: 75,
        alpha: 1,
        angle: 20,
        fallof: 0.5,
    }
})

Renderer.render(generator.branches)