import { GeneratorSettings as GeneratorSettings } from "./types/settings.js";

export class SentenceGenerator {
    public sentence: string = ""

    public generateSentence(settings: GeneratorSettings): string {
        console.assert(settings.axiom?.length > 0, "Axiom is empty")

        this.sentence = settings.axiom

        for(let i: number = 0; i < settings.iterations; ++i) {
            let newSentence: string = ""

            for(const symbol of this.sentence) {
                const ruleSuccessor: string | undefined = settings.rules[symbol]
                newSentence += ruleSuccessor ? ruleSuccessor : symbol
            }

            this.sentence = newSentence
        }

        return this.sentence
    }
}
