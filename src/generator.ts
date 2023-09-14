import { GeneratorSettings as GeneratorSettings } from "./types/settings.js";

export class SentenceGenerator {
    public cachedSentence: string = ""

    public generateSentence(settings: GeneratorSettings): string {
        console.assert(settings.axiom?.length > 0, "Axiom is empty")

        let sentence: string = settings.axiom

        for(let i: number = 0; i < settings.iterations; ++i) {
            let newSentence: string = ""

            for(const symbol of sentence) {
                const ruleSuccessor: string | undefined = settings.rules[symbol]
                newSentence += ruleSuccessor ? ruleSuccessor : symbol
            }

            sentence = newSentence
        }

        this.cachedSentence = sentence
        return this.cachedSentence
    }
}
