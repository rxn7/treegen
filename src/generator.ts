import { LindenmayerSettings } from "./settings";
import random from 'random-seedable'

export namespace Generator {
	export type Symbol = 'F' | '+' | '-' | '[' | ']'
	export type Sentence = Array<Symbol>

    let settings: LindenmayerSettings

    export function setSettings(newSettings: LindenmayerSettings): void {
        settings = newSettings
        random.seed = newSettings.seed
    }
}