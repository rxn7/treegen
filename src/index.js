import { SentenceGenerator } from "./generator.js";
import { Renderer } from "./renderer.js";
import { Settings } from "./settings.js";
export var Main;
(function (Main) {
    Main.presets = [
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
    ];
    Main.generatorSettings = {
        axiom: '',
        rules: {},
        iterations: 5,
    };
    Main.rendererSettings = {
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
    };
    Main.currentRulePresetIdx = 0;
    Main.getCurrentRulePreset = () => Main.currentRulePresetIdx;
    Main.setCurrentRulePreset = (i) => {
        const preset = Main.presets[Main.currentRulePresetIdx = i];
        Main.generatorSettings = { ...Main.generatorSettings, ...preset.generatorSettings };
        Main.rendererSettings = { ...Main.rendererSettings, ...preset.rendererSettings };
        Settings.refresh();
    };
    let generator = new SentenceGenerator();
    function regenerate() {
        Renderer.render(generator.generateSentence(Main.generatorSettings), Main.rendererSettings);
    }
    Main.regenerate = regenerate;
    function render() {
        Renderer.render(generator.sentence, Main.rendererSettings);
    }
    Main.render = render;
})(Main || (Main = {}));
Settings.init();
Main.setCurrentRulePreset(0);
Main.regenerate();
