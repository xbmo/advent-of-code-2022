import { iterateFileLineByLine } from "../common/fileLoading";

function getScenicScoreForPosition(gridArray: number[][], x: number, y: number) {
    let height = gridArray[y][x];
    let up = addScenicScoreForDirection(gridArray, height, x, y, 0, -1);
    let down = addScenicScoreForDirection(gridArray, height, x, y, 0, 1);
    let left = addScenicScoreForDirection(gridArray, height, x, y, -1, 0);
    let right = addScenicScoreForDirection(gridArray, height, x, y, 1, 0);

    return up * down * left * right;
}

function addScenicScoreForDirection(gridArray: number[][], maxHeight: number, lastX: number, lastY: number, xOffset: number, yOffset: number) : number {
    let x = lastX + xOffset;
    let y = lastY + yOffset;

    if (gridArray[x] === undefined || gridArray[x][y] === undefined) {
        return 0;
    }

    let height = gridArray[y][x];
    if (height >= maxHeight) {
        return 1;
    }
    
    return 1 + addScenicScoreForDirection(gridArray, maxHeight, x, y, xOffset, yOffset);
}

function main(filepath: string) {
    let gridArray: number[][] = [];

    iterateFileLineByLine(filepath, (line) => {
        let row : number[] = [];
        for (let i = 0; i < line.length; i++) {
            row.push(parseInt(line[i]));
        }
        gridArray.push(row);
    });

    let gridWidth = gridArray[0].length;
    let gridHeight = gridArray.length;

    let scenicScoreValues: number[] = [];
    for (let y = 1; y < gridHeight; y++) {
        for (let x = 1; x < gridWidth; x++) {
            scenicScoreValues.push(getScenicScoreForPosition(gridArray, x, y));
        }
    }

    scenicScoreValues.sort((a, b)=> {
        return b - a;
    });

    console.log("Highest Score  = " + scenicScoreValues[0]);
}

//let filepath = "../../data/08/test_08.txt";
let filepath = "../../data/08/data_08.txt";
main(filepath);