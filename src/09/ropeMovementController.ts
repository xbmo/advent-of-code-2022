import { Vector2 } from "./vector2"

export class RopeMovementController {
    headPosition : Vector2;
    relativeTailPosition: Vector2;

    constructor() {
        this.headPosition = new Vector2(0, 0);
        this.relativeTailPosition = new Vector2(0, 0);
    }

    private checkTailConstraints() : boolean {
        if (Math.abs(this.relativeTailPosition.x) > 1 || Math.abs(this.relativeTailPosition.y) > 1) {
            return false;
        }

        return true;
    }

    moveLeft() : void {
        this.headPosition.x -= 1;
        this.relativeTailPosition.x += 1;
        if (!this.checkTailConstraints()) {
            this.relativeTailPosition.set(1, 0);
        }
    }

    moveRight() : void {
        this.headPosition.x += 1;
        this.relativeTailPosition.x -= 1;
        if (!this.checkTailConstraints()) {
            this.relativeTailPosition.set(-1, 0);
        }
    }

    moveUp() : void {
        this.headPosition.y += 1;
        this.relativeTailPosition.y -= 1;
        if (!this.checkTailConstraints()) {
            this.relativeTailPosition.set(0, -1);
        }
    }

    moveDown() : void {
        this.headPosition.y -= 1;
        this.relativeTailPosition.y += 1;
        if (!this.checkTailConstraints()) {
            this.relativeTailPosition.set(0, 1);
        }
    }

    getTailPosition(): Vector2 {
        return new Vector2(this.headPosition.x + this.relativeTailPosition.x, this.headPosition.y + this.relativeTailPosition.y);
    }
}