import { iterateFileLineByLine } from "../common/fileLoading";
import { RopeMovementController } from "./ropeMovementController";
import { Vector2 } from "./vector2";

function getMoveFunction(directionChar: string, ropeMovementController: RopeMovementController) {
    switch (directionChar) {
        case "U":
            return ()=> ropeMovementController.moveUp();
        case "D":
            return ()=> ropeMovementController.moveDown();
        case "L":
            return ()=> ropeMovementController.moveLeft();
        case "R":
            return ()=> ropeMovementController.moveRight();
    }

    // this should never be reached, but if it does, return an empty function
    return ()=> {};
}

function processInstruction(instruction: string, ropeMovementController: RopeMovementController, positionsArray: Vector2[]) {
    let split = instruction.split(" ");
    
    type Move = () => void;
    const moveFunction : Move = getMoveFunction(split[0], ropeMovementController);
    let numMoves = parseInt(split[1]);
    for (let i = 0; i < numMoves; i++) {
        moveFunction();
        let tailPosVec2 = ropeMovementController.getTailPosition();
        // create a tuple for comparison
        if (!positionsArray.find((vec2)=> {
            return vec2.equals(tailPosVec2);
        })) {
            positionsArray.push(tailPosVec2);
        }
    }
}

function main(filepath: string) {
    let positionsArray: Vector2[] = [];
    let ropeMovementController = new RopeMovementController();

    iterateFileLineByLine(filepath, (line) => {
        processInstruction(line, ropeMovementController, positionsArray);
    });

    console.log(positionsArray.length);
}

//let filepath = "../../data/09/test_09.txt";
let filepath = "../../data/09/data_09.txt";
main(filepath);