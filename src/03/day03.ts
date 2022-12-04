import { join } from "path";
import { iterateFileLineByLine } from "../common/fileLoading";

function getCommonCharFromBothHalvesOfStringg(text : string) {
    let halfLength = text.length / 2;
    for (let i = 0; i < halfLength; i++) {
        let firstChar = text[i];
        for (let j = halfLength; j < text.length; j++) {
            let secondChar = text[j];
            if (firstChar == secondChar) {
                return firstChar;
            }
        }
    }

    return null;
}

function main() {
    //let filepath = "../../data/03/test_03.txt";
    let filepath = "../../data/03/data_03.txt";
    const upperCaseAsciiStart = 65;
    const lowerCaseAsciiStart = 97;
    
    let sum = 0;
    iterateFileLineByLine(filepath, (line) => {
        let commonChar = getCommonCharFromBothHalvesOfStringg(line);
        if (commonChar !== null) {
            let priority = 0;
            let toAscii = commonChar.charCodeAt(0);
            if (toAscii >= lowerCaseAsciiStart) {
                // convert to 1 - 26 range
                priority = toAscii - lowerCaseAsciiStart + 1;
            }
            else {
                priority = toAscii - upperCaseAsciiStart + 27;
            }

            console.log(commonChar + ", priority = " + priority);

            sum += priority;
        }
    });

    console.log("Final sum = " + sum);
}

main();