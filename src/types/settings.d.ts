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
	angleRandomness: number,
	length: number,
	lengthFalloff: number,
	pivotX: number,
	pivotY: number,
}
