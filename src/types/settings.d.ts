import { Symbol } from "./symbol.js"
import { Sentence } from "./sentence.js"
import { Rule } from "./rule.js"

export type GeneratorSettings = {
    axiom: Sentence,
    rules: Map<Symbol, Sentence>,
	iterations: number,
}

export type RendererSettings = {
	color: string,
	width: number,
	seed: string,
    angle: number,
	length: number,
	fallof: number,
    randomness: number,
}