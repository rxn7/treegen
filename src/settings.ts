import { Main } from "./index.js"
import Random from "./random.js"

const inputFrame: HTMLDivElement = document.getElementById('input-frame') as HTMLDivElement

createNumberOption('Seed',
    0, Number.MAX_SAFE_INTEGER,
    () => Random.hashCode(Main.rendererSettings.seed), 
    (v: string | number) => Main.rendererSettings.seed = v.toString(), true)

createNumberOption('Preset',
    0, Main.rulePresets.length-1,
    Main.getCurrentRulePreset,
    (v: number) => Main.setCurrentRulePreset(v), true)

createNumberOption('Iterations',
    1, 15,
    () => Main.generatorSettings.iterations,
    (v: number) => Main.generatorSettings.iterations = v, true)

createRangeOption('Angle',
    1, 180, 1,
    () => Main.rendererSettings.angle,
    (v: number) => Main.rendererSettings.angle = v)

createRangeOption('Length',
    1, 500, 1,
    () => Main.rendererSettings.length,
    (v: number) => Main.rendererSettings.length = v)

createRangeOption('Randomness',
    0.0, 1.0, 0.01,
    () => Main.rendererSettings.randomness,
    (v: number) => Main.rendererSettings.randomness = v)

createOption('Color', 'color',
    () => Main.rendererSettings.color, 
    (v: string | number) => {Main.rendererSettings.color = v as string})

function createNumberOption(label: string, min: number, max: number, value: () => number, setValue: (v: number) => void, regenerate: boolean = false): void {
    const inputElement: HTMLInputElement = createOption(label, 'number', value, (v: number | string) => setValue(v as number), regenerate)
    inputElement.min = min.toString()
    inputElement.max = max.toString()
}

function createRangeOption(label: string, min: number, max: number, step: number, value: () => number, setValue: (v: number) => void, regenerate: boolean = false): void {
    const inputElement: HTMLInputElement = createOption(label, 'range', value, (v: number | string) => setValue(v as number), regenerate)
    inputElement.min = min.toString()
    inputElement.max = max.toString()
    inputElement.step = step.toString()
}

function createOption(label: string, inputType: string, value: () => string | number, setValue: (v: string | number) => void, regenerate: boolean = false): HTMLInputElement {
    const container: HTMLDivElement = document.createElement('div')
    container.className = 'input-container'

    const labelElement: HTMLLabelElement = document.createElement('label') as HTMLLabelElement
    labelElement.textContent = label
    container.appendChild(labelElement)

    const inputElement: HTMLInputElement = document.createElement('input') as HTMLInputElement
    inputElement.type = inputType

    const valueType: string = typeof(value())
    switch(valueType) {
        case 'number': inputElement.valueAsNumber = value() as number; break
        case 'string': inputElement.value = value() as string; break
    }

    inputElement.addEventListener('input', () => {
        setValue(valueType === 'number' ? inputElement.valueAsNumber : inputElement.value)
        regenerate ? Main.regenerate() : Main.render()
    })

    container.appendChild(inputElement)
    inputFrame.appendChild(container)

    return inputElement
}