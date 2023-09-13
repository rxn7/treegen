import { Generator } from "./generator.js";
import { Renderer } from "./renderer.js";
import { Sentence } from "./types/sentence.js";
import { RendererSettings, GeneratorSettings } from "./types/settings.js";
import { Symbol } from "./types/symbol.js";

export namespace Main {
    export const rulePresets: Array<Map<Symbol, Sentence>> = [
        new Map<Symbol, Sentence>([
            ['X', ['F', '-', '[', '[', 'X', ']', '+', 'Y', ']', '+', 'F', '[', '+', 'F', 'X', ']', '-', 'X']]
        ]),
        new Map<Symbol, Sentence>([
            ['X', ['F', '+', '[', '-', 'F', '-', 'X', 'F', '-', 'X', ']', '[', '+', 'F', 'F', ']', '[', '-', '-', 'X', 'F', '[', '+', 'X', ']', ']', '[', '+', '+', 'F', '-', 'X', ']', ]],
        ]),
        new Map<Symbol, Sentence>([
            ['X', ['F', '-', '[', '[', 'X', ']', '+', 'Y', ']', '+', 'F', '[', '+', 'F', 'X', ']', '-', 'Y']],
            ['Y', ['F', '-', 'F', '+', 'X']]
        ]),
    ]

    export let generatorSettings: GeneratorSettings = {
        axiom: ['X'],
        rules: rulePresets[0],
        iterations: 5,
    }

    export let rendererSettings: RendererSettings = {
        color: '#533118',
        width: 1.0,
        seed: 'seed',
        randomness: 0.2,
        angle: 20,
        length: 70,
        fallof: 0.5,
    }

    export let currentRulePreset: number = 0
    export const getCurrentRulePreset = () => currentRulePreset
    export const setCurrentRulePreset = (i: number) => { currentRulePreset = i; generatorSettings.rules = rulePresets[i]; }

    export const generator: Generator = new Generator()

    export async function regenerate() {
        generator.regenerateSentence(generatorSettings);
        Main.render()
    }

    export async function render() {
        Renderer.render(generator.sentence, rendererSettings)
    }
}

Main.regenerate()