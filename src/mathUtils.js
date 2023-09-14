export var MathUtils;
(function (MathUtils) {
    function moveForward(x, y, distance, rotation) {
        return [
            x - distance * Math.sin(rotation),
            y + distance * Math.cos(rotation)
        ];
    }
    MathUtils.moveForward = moveForward;
})(MathUtils || (MathUtils = {}));
