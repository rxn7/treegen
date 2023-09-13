import { Symbol } from "./symbol.js"
import { Sentence } from "./sentence.js"
import { Rule } from "./rule.js"

export type LindenmayerSettings = {
    axiom: Sentence,
    rules: Map<Symbol, Sentence>,
	iterations: number,
	seed: number,
    branchesSettings: BranchesSettings
}

export type LeavesSettings = {
	color: string,
	length: number,
	width: number,
}

export type BranchesSettings = {
	color: string,
	alpha: number,
	length: number,
	width: number,
	angle: number,
	fallof: number,
}