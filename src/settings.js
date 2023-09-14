import { Main } from "./index.js";
import Random from "./random.js";
const inputFrame = document.getElementById('input-frame');
createNumberOption('Seed', 0, Number.MAX_SAFE_INTEGER, () => Random.hashCode(Main.rendererSettings.seed), (v) => Main.rendererSettings.seed = v.toString(), true);
createSelect('Preset', Main.presets.map(p => p.name), Main.getCurrentRulePreset, (v) => Main.setCurrentRulePreset(v), true);
createNumberOption('Iterations', 1, 100, () => Main.generatorSettings.iterations, (v) => Main.generatorSettings.iterations = v, true);
createRangeOption('Angle', 1, 180, 1, () => Main.rendererSettings.angle, (v) => Main.rendererSettings.angle = v);
createRangeOption('Length', 0.001, 100, 0.01, () => Main.rendererSettings.length, (v) => Main.rendererSettings.length = v);
createRangeOption('Randomness', 0.0, 1.0, 0.01, () => Main.rendererSettings.randomness, (v) => Main.rendererSettings.randomness = v);
createInput('Color', 'color', () => Main.rendererSettings.color, (v) => { Main.rendererSettings.color = v; });
createInput('Background color', 'color', () => Main.rendererSettings.bgColor, (v) => { Main.rendererSettings.bgColor = v; });
function createNumberOption(label, min, max, value, setValue, regenerate = false) {
    const inputElement = createInput(label, 'number', value, (v) => setValue(v), regenerate);
    inputElement.min = min.toString();
    inputElement.max = max.toString();
}
function createRangeOption(label, min, max, step, value, setValue, regenerate = false) {
    const inputElement = createInput(label, 'range', value, (v) => setValue(v), regenerate);
    inputElement.min = min.toString();
    inputElement.max = max.toString();
    inputElement.step = step.toString();
}
function createInput(label, inputType, value, setValue, regenerate = false) {
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
    createInputContainer(label, inputElement);
    return inputElement;
}
function createSelect(label, items, value, setValue, regenerate = false) {
    const selectElement = document.createElement('select');
    for (let i = 0; i < items.length; ++i) {
        const optionElement = document.createElement('option');
        optionElement.innerText = items[i];
        selectElement.appendChild(optionElement);
    }
    selectElement.selectedIndex = value();
    selectElement.addEventListener('change', () => {
        setValue(selectElement.selectedIndex);
        regenerate ? Main.regenerate() : Main.render();
    });
    createInputContainer(label, selectElement);
    return selectElement;
}
function createInputContainer(label, element) {
    const container = document.createElement('div');
    container.className = 'input-container';
    const labelElement = document.createElement('label');
    labelElement.textContent = label;
    container.appendChild(labelElement);
    container.appendChild(element);
    inputFrame.appendChild(container);
}
