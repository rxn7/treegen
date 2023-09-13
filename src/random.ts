export default class Random {
    private seed: number;

    constructor(seed: string) {
        this.seed = Random.hashCode(seed);
    }

    public static hashCode(str: string): number {
        let hash: number = 0;

        if (str.length == 0)
            return 0;

        for (let i = 0; i < str.length; i++) {
            const char: number = str.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash; // Convert to 32bit integer
        }

        return hash;
    }

    public random(): number {
        const x: number = Math.sin(this.seed++) * 10000;
        return x - Math.floor(x);
    }

    public randomized(value: number, randomness: number): number {
        return value + (randomness * (this.random() - 0.5) * 2.0 * value)
    }
}