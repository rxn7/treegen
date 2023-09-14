import { Symbol } from "./symbol.js"
import { Rule } from "./rule.js"

export type GeneratorSettings = {
    axiom: string,
    rules: Record<string, string>,
	iterations: number,
}

export type RendererSettings = {
	bgColor: string,
	color: string,
	width: number,
	seed: string,
    angle: number,
	length: number,
	falloff: number,
    randomness: number,
}
