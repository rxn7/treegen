import { SentenceGenerator } from "./generator.js";
import { Renderer } from "./renderer.js";
import { RendererSettings, GeneratorSettings } from "./types/settings.js";

export namespace Main {
    export const rulePresets: Array<Record<string, string>> = [
        {
            'X': 'F-[[X]+Y]+F[+FX]-X',
        },
    ]

    export let generatorSettings: GeneratorSettings = {
        axiom: 'X',
        rules: rulePresets[0],
        iterations: 5,
    }

    export let rendererSettings: RendererSettings = {
        bgColor: '#6aaaff',
        color: '#533118',
        width: 1.0,
        seed: 'seed',
        randomness: 0.2,
        angle: 20,
        length: 70,
        falloff: 0.5,
    }

    export let currentRulePreset: number = 0
    export const getCurrentRulePreset = () => currentRulePreset
    export const setCurrentRulePreset = (i: number) => { currentRulePreset = i; generatorSettings.rules = rulePresets[i]; }
    let generator: SentenceGenerator = new SentenceGenerator()

    export function regenerate() {
        Renderer.render(generator.generateSentence(generatorSettings), rendererSettings)
    }

    export function render() {
        Renderer.render(generator.cachedSentence, rendererSettings)
    }
}

Main.regenerate()
