import { Generator } from "./generator.js";
import { Renderer } from "./renderer.js";
export var Main;
(function (Main) {
    Main.rulePresets = [
        new Map([
            ['X', ['F', '-', '[', '[', 'X', ']', '+', 'Y', ']', '+', 'F', '[', '+', 'F', 'X', ']', '-', 'X']]
        ]),
        new Map([
            ['X', ['F', '+', '[', '-', 'F', '-', 'X', 'F', '-', 'X', ']', '[', '+', 'F', 'F', ']', '[', '-', '-', 'X', 'F', '[', '+', 'X', ']', ']', '[', '+', '+', 'F', '-', 'X', ']',]],
        ]),
        new Map([
            ['X', ['F', '-', '[', '[', 'X', ']', '+', 'Y', ']', '+', 'F', '[', '+', 'F', 'X', ']', '-', 'Y']],
            ['Y', ['F', '-', 'F', '+', 'X']]
        ]),
    ];
    Main.generatorSettings = {
        axiom: ['X'],
        rules: Main.rulePresets[0],
        iterations: 5,
    };
    Main.rendererSettings = {
        color: '#533118',
        width: 1.0,
        seed: 'seed',
        randomness: 0.2,
        angle: 20,
        length: 70,
        fallof: 0.5,
    };
    Main.currentRulePreset = 0;
    Main.getCurrentRulePreset = () => Main.currentRulePreset;
    Main.setCurrentRulePreset = (i) => { Main.currentRulePreset = i; Main.generatorSettings.rules = Main.rulePresets[i]; };
    Main.generator = new Generator();
    async function regenerate() {
        Main.generator.regenerateSentence(Main.generatorSettings);
        Main.render();
    }
    Main.regenerate = regenerate;
    async function render() {
        Renderer.render(Main.generator.sentence, Main.rendererSettings);
    }
    Main.render = render;
})(Main || (Main = {}));
Main.regenerate();
