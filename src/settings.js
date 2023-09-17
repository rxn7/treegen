import { Main } from "./index.js";
import Random from "./random.js";
export var Settings;
(function (Settings) {
    const inputFrame = document.getElementById('input-frame');
    const elements = [];
    const refreshEvent = new CustomEvent('refresh');
    function init() {
        createSelect('Preset', Main.presets.map(p => p.name), Main.getCurrentRulePreset, (v) => Main.setCurrentRulePreset(v), true);
        createNumberOption('Seed', 0, Number.MAX_SAFE_INTEGER, () => Random.hashCode(Main.rendererSettings.seed), (v) => Main.rendererSettings.seed = v.toString(), true);
        createNumberOption('Iterations', 1, 100, () => Main.generatorSettings.iterations, (v) => Main.generatorSettings.iterations = v, true);
        createRangeOption('Angle', 1, 180, 1, () => Main.rendererSettings.angle, (v) => Main.rendererSettings.angle = v);
        createRangeOption('Angle randomness', 0.0, 1.0, 0.01, () => Main.rendererSettings.angleRandomness, (v) => Main.rendererSettings.angleRandomness = v);
        createRangeOption('Width', 0.001, 10.0, 0.01, () => Main.rendererSettings.width, (v) => Main.rendererSettings.width = v);
        createRangeOption('Length', 0.001, 100, 0.01, () => Main.rendererSettings.length, (v) => Main.rendererSettings.length = v);
        createRangeOption('Length falloff', 0.001, 1.0, 0.01, () => Main.rendererSettings.lengthFalloff, (v) => Main.rendererSettings.lengthFalloff = v);
        createNumberOption('Pivot.X', -10, 10, () => Main.rendererSettings.pivotX, (v) => Main.rendererSettings.pivotX = v);
        createNumberOption('Pivot.Y', -10, 10, () => Main.rendererSettings.pivotY, (v) => Main.rendererSettings.pivotY = v);
        createInput('Color', 'color', () => Main.rendererSettings.color, (v) => { Main.rendererSettings.color = v; });
        createInput('Background color', 'color', () => Main.rendererSettings.bgColor, (v) => { Main.rendererSettings.bgColor = v; });
    }
    Settings.init = init;
    function refresh() {
        for (const el of elements)
            el.dispatchEvent(refreshEvent);
    }
    Settings.refresh = refresh;
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
        const refresh = () => {
            switch (valueType) {
                case 'number':
                    inputElement.valueAsNumber = value();
                    break;
                case 'string':
                    inputElement.value = value();
                    break;
            }
        };
        inputElement.addEventListener('input', () => {
            setValue(valueType === 'number' ? inputElement.valueAsNumber : inputElement.value);
            regenerate ? Main.regenerate() : Main.render();
        });
        inputElement.addEventListener('refresh', () => refresh());
        refresh();
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
        const refresh = () => {
            selectElement.selectedIndex = value();
        };
        selectElement.addEventListener('change', () => {
            setValue(selectElement.selectedIndex);
            regenerate ? Main.regenerate() : Main.render();
        });
        selectElement.addEventListener('refresh', () => refresh());
        refresh();
        createInputContainer(label, selectElement);
        return selectElement;
    }
    function createInputContainer(label, element) {
        const container = document.createElement('div');
        container.className = 'input-container';
        const labelElement = document.createElement('label');
        labelElement.textContent = label;
        container.appendChild(labelElement);
        elements.push(element);
        container.appendChild(element);
        inputFrame.appendChild(container);
    }
})(Settings || (Settings = {}));
