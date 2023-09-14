import { SentenceGenerator } from "./generator.js";
import { Renderer } from "./renderer.js";
import { Preset } from "./types/preset.js";
import { RendererSettings, GeneratorSettings } from "./types/settings.js";

export namespace Main {
    export const presets: Array<Preset> = [
        {
            name: "Basic tree",
            pivotY: 1.0,
            pivotX: 0.5,
            randomness: 0.1,
            angle: 20,
            axiom: 'X',
            rules: {
                'X': 'F-((X)+Y)+F(+FX)-X',
            }
        },
        {
            name: "Basic tree 2",
            pivotY: 1.0,
            pivotX: 0.5,
            randomness: 0.1,
            angle: 20,
            axiom: 'X',
            rules: {
                'X': 'F+((X)-X)-F(-FX)+X',
            }
        },
        {
            name: "Sierpinski triangle",
            pivotY: 1.0,
            pivotX: 0.0,
            randomness: 0.0,
            angle: 120,
            axiom: 'F-F-F',
            rules: {
                'F': 'F-G+F+G-F',
                'G': 'GG'
            }
        },
    ]

    export let generatorSettings: GeneratorSettings = {
        axiom: '',
        rules: {},
        iterations: 5,
    }

    export let rendererSettings: RendererSettings = {
        pivotX: -0.5,
        pivotY: 1.0,
        bgColor: '#6aaaff',
        color: '#533118',
        width: 1.0,
        seed: 'seed',
        randomness: 0.2,
        angle: 120,
        length: 70,
        falloff: 0.5,
    }

    export let currentRulePresetIdx: number = 0
    export const getCurrentRulePreset = () => currentRulePresetIdx
    export const setCurrentRulePreset = (i: number) => { 
        currentRulePresetIdx = i; 
        const preset: Preset = presets[currentRulePresetIdx] 

        generatorSettings.rules = preset.rules 
        generatorSettings.axiom = preset.axiom 

        rendererSettings.angle = preset.angle
        rendererSettings.randomness = preset.randomness
        rendererSettings.pivotX = preset.pivotX
        rendererSettings.pivotY = preset.pivotY
    }

    let generator: SentenceGenerator = new SentenceGenerator()

    export function regenerate() {
        Renderer.render(generator.generateSentence(generatorSettings), rendererSettings)
    }

    export function render() {
        Renderer.render(generator.cachedSentence, rendererSettings)
    }
}

Main.setCurrentRulePreset(0);
Main.regenerate()
