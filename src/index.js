import { SentenceGenerator } from "./generator.js";
import { Renderer } from "./renderer.js";
export var Main;
(function (Main) {
    Main.presets = [
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
        randomness: 0.2,
        angle: 120,
        length: 70,
        falloff: 0.5,
    };
    Main.currentRulePresetIdx = 0;
    Main.getCurrentRulePreset = () => Main.currentRulePresetIdx;
    Main.setCurrentRulePreset = (i) => {
        Main.currentRulePresetIdx = i;
        const preset = Main.presets[Main.currentRulePresetIdx];
        Main.generatorSettings.rules = preset.rules;
        Main.generatorSettings.axiom = preset.axiom;
        Main.rendererSettings.angle = preset.angle;
        Main.rendererSettings.randomness = preset.randomness;
        Main.rendererSettings.pivotX = preset.pivotX;
        Main.rendererSettings.pivotY = preset.pivotY;
    };
    let generator = new SentenceGenerator();
    function regenerate() {
        Renderer.render(generator.generateSentence(Main.generatorSettings), Main.rendererSettings);
    }
    Main.regenerate = regenerate;
    function render() {
        Renderer.render(generator.cachedSentence, Main.rendererSettings);
    }
    Main.render = render;
})(Main || (Main = {}));
Main.setCurrentRulePreset(0);
Main.regenerate();
