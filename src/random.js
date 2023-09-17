export default class Random {
    constructor(seed) {
        this.seed = Random.hashCode(seed);
    }
    static hashCode(str) {
        let hash = 0;
        if (str.length == 0)
            return 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash;
        }
        return hash;
    }
    random() {
        const x = Math.sin(this.seed++) * 10000;
        return x - Math.floor(x);
    }
    randomized(value, randomness) {
        if (randomness <= 0.0)
            return value;
        return value + (randomness * (this.random() - 0.5) * 2.0 * value);
    }
}
