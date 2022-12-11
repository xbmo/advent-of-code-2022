import { iterateFileLineByLine } from "../common/fileLoading";

const MAX_HEIGHT = 9;
const PROCESSED_VALUE_OFFSET = 100;

enum Direction {
    Up,
    Down,
    Left,
    Right
}

function isVerticalDirection(direction: Direction) {
    return direction == Direction.Up || direction == Direction.Down;
}

function isReverseSearch(direction: Direction) {
    return direction == Direction.Up || direction == Direction.Right;
}

function checkDirectionForNewVisibleTrees(direction: Direction, gridArray: number[][], gridWidth: number, gridHeight: number) : number {
    let numNewVisibleTrees = 0;
    
    let isVertical = isVerticalDirection(direction);
    let isReverse = isReverseSearch(direction);
    let iterationLength = isVertical ? gridWidth : gridHeight;
    let searchLength = isVertical ? gridHeight : gridWidth;
    for (let i = 0; i < iterationLength; i++) {
        let previousMaxHeight = -1;
        for (let j = 0; j < searchLength; j++) {
            let searchIndex = isReverse ? searchLength - 1 - j : j;
            let x = isVertical ? searchIndex : i;
            let y = isVertical ? i : searchIndex;

            let heightValue = gridArray[x][y];
            let adjustedHeightValue = heightValue >= PROCESSED_VALUE_OFFSET ? heightValue - PROCESSED_VALUE_OFFSET : heightValue;
            if (adjustedHeightValue > previousMaxHeight) {
                previousMaxHeight = adjustedHeightValue;
                //trees that have already been counted as visible are marked by having their height value offset
                if (heightValue < PROCESSED_VALUE_OFFSET) {
                    numNewVisibleTrees++;
                    gridArray[x][y] = heightValue + PROCESSED_VALUE_OFFSET;
                }

                if (adjustedHeightValue == MAX_HEIGHT) {
                    break;
                }
            }
        }
    }

    return numNewVisibleTrees;
}

function printGrid(gridArray: number[][]) {
    for (let y = 0; y < gridArray.length; y++) {
        console.log(JSON.stringify(gridArray[y]));
    }
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

    let visibleTrees = checkDirectionForNewVisibleTrees(Direction.Up, gridArray, gridWidth, gridHeight);
    visibleTrees += checkDirectionForNewVisibleTrees(Direction.Down, gridArray, gridWidth, gridHeight);
    visibleTrees += checkDirectionForNewVisibleTrees(Direction.Left, gridArray, gridWidth, gridHeight);
    visibleTrees += checkDirectionForNewVisibleTrees(Direction.Right, gridArray, gridWidth, gridHeight);

    //printGrid(gridArray);
    console.log("Final value = " + visibleTrees);
}

//let filepath = "../../data/08/test_08.txt";
let filepath = "../../data/08/data_08.txt";
main(filepath);