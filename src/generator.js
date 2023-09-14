export class SentenceGenerator {
    constructor() {
        this.cachedSentence = "";
    }
    generateSentence(settings) {
        console.assert(settings.axiom?.length > 0, "Axiom is empty");
        let sentence = settings.axiom;
        for (let i = 0; i < settings.iterations; ++i) {
            let newSentence = "";
            for (const symbol of sentence) {
                const ruleSuccessor = settings.rules[symbol];
                newSentence += ruleSuccessor ? ruleSuccessor : symbol;
            }
            sentence = newSentence;
        }
        this.cachedSentence = sentence;
        return this.cachedSentence;
    }
}
