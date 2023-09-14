import { RendererSettings } from "./settings"

export type Preset = {
	name: string
	axiom: string
	rules: Record<string, string>
	rendererSettings: Partial<RendererSettings>
}
