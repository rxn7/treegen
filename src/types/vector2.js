export var Vector2;
(function (Vector2) {
    Vector2.add = (v1, v2) => { return { x: v1.x + v2.x, y: v1.y + v2.y }; };
    Vector2.sub = (v1, v2) => { return { x: v1.x - v2.x, y: v1.y - v2.y }; };
    function rotated(v, angle) {
        const angleCos = Math.cos(angle);
        const angleSin = Math.sin(angle);
        return {
            x: v.x * angleCos - v.y * angleSin,
            y: v.x * angleSin + v.y * angleCos
        };
    }
    Vector2.rotated = rotated;
})(Vector2 || (Vector2 = {}));
