import { loadFileAsStringArrayOfLines } from "../common/fileLoading"

function resetStringArray(array: string[]) {
    for (let i = 0; i < array.length; i++) {
        array[i] = "";
    }
}

function main(filepath : string) {
    let contents = loadFileAsStringArrayOfLines(filepath);

    // there is only one line in this puzzle input
    let line = contents[0];

    const windowSize = 14;
    let windowArray: string[] = [];
    for (let i = 0; i < windowSize; i++) {
        windowArray.push("");
    }

    for (let i = 0; i < line.length; i++) {
        for (let j = 0; j < windowSize; j++) {
            let arrayIndex = i + j;
            let char = line[arrayIndex];
            let isValidChar = true;
            windowArray[j] = char;
            for (let k = 0; k < j; k++) {
                if (windowArray[k] == char) {
                    isValidChar = false;
                    break;
                }
            }

            if (!isValidChar) {
                resetStringArray(windowArray);
                break;
            }
        }

        if (windowArray[windowSize - 1] !== "") {
            console.log("Final answer = " + (i + windowSize));
            break;
        }
    }
}

//let filepath = "../../data/06/test_06.txt";
let filepath = "../../data/06/data_06.txt";
main(filepath);