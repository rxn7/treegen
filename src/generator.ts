import { Turtle } from "./turtle.js";
import { Branch } from "./types/branch.js";
import { Sentence } from "./types/sentence.js";
import { LindenmayerSettings as GeneratorSettings } from "./types/settings.js";

export class Generator {
    public sentence: Sentence = []
    public branches: Array<Branch> = []

    constructor(public settings: GeneratorSettings) {
        this.regenerate();
    }

    private regenerate(): void {
        this.updateSentence();
        this.updateBranches();
    }

    private updateSentence(): void {
        console.assert(this.settings.axiom?.length > 0, "Axiom is empty")
        console.assert(this.settings.rules?.size > 0, "Rules are empty")

        this.sentence = this.settings.axiom.slice()

        for(let i: number = 0; i < this.settings.iterations; ++i) {
            const newSentence: Sentence = []

            for(const symbol of this.sentence) {
                const ruleSuccessor: Sentence | undefined = this.settings.rules.get(symbol)
                ruleSuccessor 
                    ? newSentence.push(...ruleSuccessor)
                    : newSentence.push(symbol)
            }

            this.sentence = newSentence
        }
    }

    private updateBranches(): void {
        this.branches = []

        let length = this.settings.branchesSettings.length
        const turtle: Turtle = new Turtle()

        for(const symbol of this.sentence) {
            switch(symbol) {
                case 'F':
                    const [start, end] = turtle.createLine(length)
                    this.branches.push({ start: start, end: end })
                    break

                case '+':
                    turtle.rotate(this.settings.branchesSettings.angle)
                    break

                case '-':
                    turtle.rotate(-this.settings.branchesSettings.angle)
                    break

                case '[':
                    turtle.push()
                    length *= this.settings.branchesSettings.fallof
                    break

                case ']':
                    turtle.pop()
                    length /= this.settings.branchesSettings.fallof
                    break
            }
        }
    }
}