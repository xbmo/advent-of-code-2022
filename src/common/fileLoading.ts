import fs from 'fs'
import * as path from 'path'


function loadFileAsString(filepath : string) {
    let contents = fs.readFileSync(path.join(__dirname, filepath));
    return contents.toString();
}

function splitText(text : string) : string[] {
    return text.split("\r\n");
}

export function loadFileAsStringArrayOfLines(filepath : string) {
    return splitText(loadFileAsString(filepath));
}

export function iterateFileLineByLine(filepath: string, fn: (line : string) => void) {
    let contents = loadFileAsStringArrayOfLines(filepath);
    let lineIndex = 0;
    while (lineIndex < contents.length) {
        fn(contents[lineIndex]);
        lineIndex++;
    }
}