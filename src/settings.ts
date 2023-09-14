import { Main } from "./index.js"
import Random from "./random.js"

export namespace Settings {
    const inputFrame: HTMLDivElement = document.getElementById('input-frame') as HTMLDivElement
    const elements: Array<HTMLElement> = []
    const refreshEvent: CustomEvent = new CustomEvent('refresh')

    export function init() {
        createSelect('Preset',
            Main.presets.map(p => p.name),
            Main.getCurrentRulePreset,
            (v: number) => Main.setCurrentRulePreset(v), true)

        createNumberOption('Seed',
            0, Number.MAX_SAFE_INTEGER,
            () => Random.hashCode(Main.rendererSettings.seed),
            (v: string | number) => Main.rendererSettings.seed = v.toString(), true)

        createNumberOption('Iterations',
            1, 100,
            () => Main.generatorSettings.iterations,
            (v: number) => Main.generatorSettings.iterations = v, true)

        createRangeOption('Angle',
            1, 180, 1,
            () => Main.rendererSettings.angle,
            (v: number) => Main.rendererSettings.angle = v)

        createRangeOption('Angle randomness',
            0.0, 1.0, 0.01,
            () => Main.rendererSettings.angleRandomness,
            (v: number) => Main.rendererSettings.angleRandomness = v)

        createRangeOption('Width',
            0.001, 10.0, 0.01,
            () => Main.rendererSettings.width,
            (v: number) => Main.rendererSettings.width = v)

        createRangeOption('Length',
            0.001, 100, 0.01,
            () => Main.rendererSettings.length,
            (v: number) => Main.rendererSettings.length = v)

        createRangeOption('Length falloff',
            0.001, 1.0, 0.01,
            () => Main.rendererSettings.lengthFalloff,
            (v: number) => Main.rendererSettings.lengthFalloff = v)

        createNumberOption('Pivot.X',
            -10, 10,
            () => Main.rendererSettings.pivotX,
            (v: number) => Main.rendererSettings.pivotX = v)

        createNumberOption('Pivot.Y',
            -10, 10, 
            () => Main.rendererSettings.pivotY,
            (v: number) => Main.rendererSettings.pivotY = v)

        createInput('Color', 'color',
            () => Main.rendererSettings.color,
            (v: string | number) => { Main.rendererSettings.color = v as string })

        createInput('Background color', 'color',
            () => Main.rendererSettings.bgColor,
            (v: string | number) => { Main.rendererSettings.bgColor = v as string })
    }

    export function refresh() {
        for (const el of elements)
            el.dispatchEvent(refreshEvent)
    }

    function createNumberOption(label: string, min: number, max: number, value: () => number, setValue: (v: number) => void, regenerate: boolean = false): void {
        const inputElement: HTMLInputElement = createInput(label, 'number', value, (v: number | string) => setValue(v as number), regenerate)
        inputElement.min = min.toString()
        inputElement.max = max.toString()
    }

    function createRangeOption(label: string, min: number, max: number, step: number, value: () => number, setValue: (v: number) => void, regenerate: boolean = false): void {
        const inputElement: HTMLInputElement = createInput(label, 'range', value, (v: number | string) => setValue(v as number), regenerate)
        inputElement.min = min.toString()
        inputElement.max = max.toString()
        inputElement.step = step.toString()
    }

    function createInput(label: string, inputType: string, value: () => string | number, setValue: (v: string | number) => void, regenerate: boolean = false): HTMLInputElement {
        const inputElement: HTMLInputElement = document.createElement('input') as HTMLInputElement
        inputElement.type = inputType

        const valueType: string = typeof (value())

        const refresh = (): void => {
            switch (valueType) {
                case 'number': inputElement.valueAsNumber = value() as number; break
                case 'string': inputElement.value = value() as string; break
            }
        }

        inputElement.addEventListener('input', () => {
            setValue(valueType === 'number' ? inputElement.valueAsNumber : inputElement.value)
            regenerate ? Main.regenerate() : Main.render()
        })

        inputElement.addEventListener('refresh', () => refresh())
        refresh()

        createInputContainer(label, inputElement)

        return inputElement
    }

    function createSelect(label: string, items: Array<string>, value: () => number, setValue: (v: number) => void, regenerate: boolean = false): HTMLSelectElement {
        const selectElement: HTMLSelectElement = document.createElement('select')

        for (let i = 0; i < items.length; ++i) {
            const optionElement: HTMLOptionElement = document.createElement('option')
            optionElement.innerText = items[i]
            selectElement.appendChild(optionElement)
        }

        const refresh = (): void => {
            selectElement.selectedIndex = value()
        }

        selectElement.addEventListener('change', () => {
            setValue(selectElement.selectedIndex)
            regenerate ? Main.regenerate() : Main.render()
        })

        selectElement.addEventListener('refresh', () => refresh())
        refresh()

        createInputContainer(label, selectElement)

        return selectElement
    }

    function createInputContainer(label: string, element: HTMLElement): void {
        const container: HTMLDivElement = document.createElement('div')
        container.className = 'input-container'

        const labelElement: HTMLLabelElement = document.createElement('label') as HTMLLabelElement
        labelElement.textContent = label
        container.appendChild(labelElement)

        elements.push(element)

        container.appendChild(element)
        inputFrame.appendChild(container)
    }
}
