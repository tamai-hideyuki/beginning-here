export class Vector2 {
    constructor(public x = 0, public y = 0) {}
}

export const Vector2Const = {
    TO_DEGREES: 180 / Math.PI,
    TO_RADIANS: Math.PI / 180,
    temp: new Vector2(),
}
