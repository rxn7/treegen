import { GeneratorSettings, RendererSettings } from "./settings"

export type Preset = {
	name: string
	generatorSettings?: Partial<GeneratorSettings>
	rendererSettings?: Partial<RendererSettings>
}
