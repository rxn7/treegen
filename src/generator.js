export class SentenceGenerator {
    constructor() {
        this.sentence = "";
    }
    generateSentence(settings) {
        console.assert(settings.axiom?.length > 0, "Axiom is empty");
        this.sentence = settings.axiom;
        for (let i = 0; i < settings.iterations; ++i) {
            let newSentence = "";
            for (const symbol of this.sentence) {
                const ruleSuccessor = settings.rules[symbol];
                newSentence += ruleSuccessor ? ruleSuccessor : symbol;
            }
            this.sentence = newSentence;
        }
        return this.sentence;
    }
}
