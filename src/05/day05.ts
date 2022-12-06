import { loadFileAsStringArrayOfLines } from "../common/fileLoading"
import { Stack } from "./stack"

function main(filepath : string, isCrateMover9001: boolean) {
    let contents = loadFileAsStringArrayOfLines(filepath);

    let instructionsStack : Stack<[number, number, number]> = new Stack<[number, number, number]>();
    let crateStackArray : Stack<string>[] = [];
    let numColumns = 0;

    // process file in reverse order and split it into a stack of instructions and an array of stacks of crates
    let isReadingInstructions = true;
    let isNumberOfColumnsLine = false;
    let lineIndex = contents.length - 1;
    while (lineIndex >= 0) {
        let line = contents[lineIndex--];

        if (line === "") {
            isReadingInstructions = false;
            isNumberOfColumnsLine = true;
            continue;
        }

        if (isReadingInstructions) {
            let numberPattern = /\d+/g;
            let results = line.match(numberPattern);
            if (results !== null) {
                let tuple : [number, number, number] = [parseInt(results[0]), parseInt(results[1]), parseInt(results[2]) ]
                instructionsStack.push(tuple);
            }
            
            let c = 3;
        }
        else if (isNumberOfColumnsLine) {
            let trimmedLine = line.trimEnd();
            numColumns = parseInt(trimmedLine[trimmedLine.length - 1]);

            for (let i = 0; i < numColumns; i++) {
                crateStackArray.push(new Stack<string>());
            }

            console.log(numColumns);
            isNumberOfColumnsLine = false;
        }        
        else { 
            const startCharIndex = 1;
            const spacing = 4;
            for (let i = 0; i < numColumns; i++) {
                let charIndex = startCharIndex + spacing * i;
                if (charIndex < line.length) {
                    let char = line[charIndex];
                    if (char !== " ") {
                        crateStackArray[i].push(char);
                    }
                }
            }
        }
    }

    // run through the instructions
    while (instructionsStack.size() > 0) {
        let instructions = instructionsStack.pop();
        let numCratesToMove = instructions ? instructions[0] : 0;
        let sourceColumn = instructions ? instructions[1] - 1 : 0;
        let targetColumn = instructions ? instructions[2] - 1 : 0;
        
        if (isCrateMover9001) {
            let tempStack:  Stack<string> = new Stack<string>();
            for (let j = 0; j < numCratesToMove; j++) {
                let crate = crateStackArray[sourceColumn].pop();
                if (crate !== undefined) {
                    tempStack.push(crate);
                }
            }

            while (tempStack.size() > 0) {
                let crate = tempStack.pop();
                if (crate !== undefined) {
                    crateStackArray[targetColumn].push(crate);
                }            
            }
        }
        else {
            for (let j = 0; j < numCratesToMove; j++) {
                let crate = crateStackArray[sourceColumn].pop();
                if (crate !== undefined) {
                    crateStackArray[targetColumn].push(crate);
                }
            }
        }
    }

    let top : string = "";
    for (let i = 0; i < crateStackArray.length; i++) {
        let crate = crateStackArray[i].pop();
        if (crate !== undefined) {
            top += crate;
        }
        
    }

    console.log("Top = " + top);
}

//let filepath = "../../data/05/test_05.txt";
let filepath = "../../data/05/data_05.txt";
main(filepath, true);