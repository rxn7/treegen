export class Generator {
    constructor() {
        this.sentence = [];
    }
    regenerateSentence(settings) {
        console.assert(settings.axiom?.length > 0, "Axiom is empty");
        console.assert(settings.rules?.size > 0, "Rules are empty");
        this.sentence = settings.axiom.slice();
        for (let i = 0; i < settings.iterations; ++i) {
            const newSentence = [];
            for (const symbol of this.sentence) {
                const ruleSuccessor = settings.rules.get(symbol);
                ruleSuccessor
                    ? newSentence.push(...ruleSuccessor)
                    : newSentence.push(symbol);
            }
            this.sentence = newSentence;
        }
    }
}
