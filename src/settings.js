import { Main } from "./index.js";
import Random from "./random.js";
const inputFrame = document.getElementById('input-frame');
createNumberOption('Seed', 0, Number.MAX_SAFE_INTEGER, () => Random.hashCode(Main.rendererSettings.seed), (v) => Main.rendererSettings.seed = v.toString(), true);
createNumberOption('Preset', 0, Main.rulePresets.length - 1, Main.getCurrentRulePreset, (v) => Main.setCurrentRulePreset(v), true);
createNumberOption('Iterations', 1, 15, () => Main.generatorSettings.iterations, (v) => Main.generatorSettings.iterations = v, true);
createRangeOption('Angle', 1, 180, 1, () => Main.rendererSettings.angle, (v) => Main.rendererSettings.angle = v);
createRangeOption('Length', 1, 500, 1, () => Main.rendererSettings.length, (v) => Main.rendererSettings.length = v);
createRangeOption('Randomness', 0.0, 1.0, 0.01, () => Main.rendererSettings.randomness, (v) => Main.rendererSettings.randomness = v);
createOption('Color', 'color', () => Main.rendererSettings.color, (v) => { Main.rendererSettings.color = v; });
createOption('Background color', 'color', () => Main.rendererSettings.bgColor, (v) => { Main.rendererSettings.bgColor = v; });
function createNumberOption(label, min, max, value, setValue, regenerate = false) {
    const inputElement = createOption(label, 'number', value, (v) => setValue(v), regenerate);
    inputElement.min = min.toString();
    inputElement.max = max.toString();
}
function createRangeOption(label, min, max, step, value, setValue, regenerate = false) {
    const inputElement = createOption(label, 'range', value, (v) => setValue(v), regenerate);
    inputElement.min = min.toString();
    inputElement.max = max.toString();
    inputElement.step = step.toString();
}
function createOption(label, inputType, value, setValue, regenerate = false) {
    const container = document.createElement('div');
    container.className = 'input-container';
    const labelElement = document.createElement('label');
    labelElement.textContent = label;
    container.appendChild(labelElement);
    const inputElement = document.createElement('input');
    inputElement.type = inputType;
    const valueType = typeof (value());
    switch (valueType) {
        case 'number':
            inputElement.valueAsNumber = value();
            break;
        case 'string':
            inputElement.value = value();
            break;
    }
    inputElement.addEventListener('input', () => {
        setValue(valueType === 'number' ? inputElement.valueAsNumber : inputElement.value);
        regenerate ? Main.regenerate() : Main.render();
    });
    container.appendChild(inputElement);
    inputFrame.appendChild(container);
    return inputElement;
}
