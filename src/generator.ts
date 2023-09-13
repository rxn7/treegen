import { Sentence } from "./types/sentence.js";
import { GeneratorSettings as GeneratorSettings } from "./types/settings.js";

export class Generator {
    public sentence: Sentence = []

    public regenerateSentence(settings: GeneratorSettings): void {
        console.assert(settings.axiom?.length > 0, "Axiom is empty")
        console.assert(settings.rules?.size > 0, "Rules are empty")

        this.sentence = settings.axiom.slice()

        for(let i: number = 0; i < settings.iterations; ++i) {
            const newSentence: Sentence = []

            for(const symbol of this.sentence) {
                const ruleSuccessor: Sentence | undefined = settings.rules.get(symbol)
                ruleSuccessor 
                    ? newSentence.push(...ruleSuccessor)
                    : newSentence.push(symbol)
            }

            this.sentence = newSentence
        }
    }
}