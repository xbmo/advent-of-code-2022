export class Vector2 {
    public x: number = 0;
    public y: number = 0;

    constructor(x: number, y: number) {
        this.set(x, y);
    }

    set(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    equals(other: Vector2) {
        return this.x == other.x && this.y == other.y;
    }
}