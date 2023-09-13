import { Generator } from "./generator";

Generator.setSettings({
    seed: +new Date(),
    interations: 10,
    variability: 1,
    leavesSettings: {
        color: '#00ff00',
        width: 1,
        length: 2,
    },
    branchesSettings: {
        color: '#ff0000',
        width: 1,
        length: 2,
        alpha: 1,
        angle: 10,
        fallof: 10,
    }
})