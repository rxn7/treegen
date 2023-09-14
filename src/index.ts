import { SentenceGenerator } from "./generator.js";
import { Renderer } from "./renderer.js";
import { Settings } from "./settings.js";
import { Preset } from "./types/preset.js";
import { RendererSettings, GeneratorSettings } from "./types/settings.js";

export namespace Main {
    export const presets: Array<Preset> = [
        {
            name: "Basic tree",
            generatorSettings: {
                iterations: 9,
                axiom: 'X',
                rules: {
                    'X': 'F-((X)+Y)+F(+FX)-X',
                },
            },
            rendererSettings: {
                length: 75,
                pivotY: 1.0,
                pivotX: 0.3,
                angleRandomness: 0.2,
                angle: 20,
            }
        },
        {
            name: "Basic tree 2",
            generatorSettings: {
                iterations: 7,
                axiom: 'X',
                rules: {
                    'X': 'F+((X)-X)-F(-FX)+X',
                },
            },
            rendererSettings: {
                length: 75,
                pivotY: 1.0,
                pivotX: 0.5,
                angleRandomness: 0.2,
                angle: 20,
            }
        },
        {
            name: "Sierpinski triangle",
            generatorSettings: {
                iterations: 7,
                axiom: 'F-F-F',
                rules: {
                    'F': 'F-G+F+G-F',
                    'G': 'GG'
                },
            },
            rendererSettings: {
                length: 5,
                pivotY: 1.0,
                pivotX: 0.0,
                angleRandomness: 0.0,
                angle: 120,
            }
        },
        {
            name: "Dragon curve",
            generatorSettings: {
                iterations: 14,
                axiom: 'FX',
                rules: {
                    'X': 'X+YF+',
                    'Y': '-FX-Y'
                },
            },
            rendererSettings: {
                length: 3,
                pivotX: 0.25,
                pivotY: 0.4,
                angleRandomness: 0.0,
                angle: 90,
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
        angle: 120,
        angleRandomness: 0.2,
        length: 70,
        lengthFalloff: 0.5,
    }

    export let currentRulePresetIdx: number = 0
    export const getCurrentRulePreset = () => currentRulePresetIdx
    export const setCurrentRulePreset = (i: number) => {
        const preset: Preset = presets[currentRulePresetIdx = i]

        generatorSettings = { ...generatorSettings, ...preset.generatorSettings }
        rendererSettings = { ...rendererSettings, ...preset.rendererSettings }

        Settings.refresh()
    }

    let generator: SentenceGenerator = new SentenceGenerator()

    export function regenerate() {
        Renderer.render(generator.generateSentence(generatorSettings), rendererSettings)
    }

    export function render() {
        Renderer.render(generator.sentence, rendererSettings)
    }
}

Settings.init()
Main.setCurrentRulePreset(0);
Main.regenerate()
