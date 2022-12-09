import { DirectoryInfo } from "./directoryInfo"
import { Stack } from "./stack"
import { iterateFileLineByLine } from "../common/fileLoading";

const MAX_FILESIZE = 100000;

let directoryStack = new Stack<DirectoryInfo>();
let directoryPath : string[] = [];
let totalSum = 0;

function processCommand(command : string, argumentString : string) {
    if (command == "cd") {
        changeDirectory(directoryStack, argumentString, directoryPath);
    }
}

function changeDirectory(stack: Stack<DirectoryInfo>, name: string, path: string[]) {
    if (name != "..") {
        pushDirectory(stack, name, path);
    }
    else {
        popDirectory(stack, path);
    }
}

function pushDirectory(stack: Stack<DirectoryInfo>, name: string, path: string[]) {
    let directoryInfo = new DirectoryInfo();
    let previousDirectory = stack.peek();
    if (previousDirectory !== undefined) {
        previousDirectory.addChildDirectory(directoryInfo);
    }

    stack.push(directoryInfo);
    path.push(name);
}

function popDirectory(stack: Stack<DirectoryInfo>, path: string[]) {
    let directoryInfo = stack.pop();

    if (directoryInfo !== undefined) {
        let filesize = directoryInfo.getFilesize(true);
        if (filesize < MAX_FILESIZE) {
            totalSum += filesize;
            
            console.log(path.join("."));
        }
    }

    path.pop();
}

function updateCurrentDirectory(argString1 : string) {
    if (argString1 == "dir") {
        //do nothing
    }
    else {
        let filesize = parseInt(argString1);
        if (filesize !== undefined) {
            let directoryInfo = directoryStack.peek();
            directoryInfo?.addToFilesize(filesize);
        }
    }
}


function parseInstruction(line : string) {
    let split = line.split(" ");
    if (split[0] == "$") {
        processCommand(split[1], split[2]);
    }
    else {
        updateCurrentDirectory(split[0]);
    }
}

function main(filepath : string) {

    iterateFileLineByLine(filepath, (line) => {
        parseInstruction(line);
    });

    console.log("Total sum = " + totalSum);
}

//let filepath = "../../data/07/test_07.txt";
let filepath = "../../data/07/data_07.txt";
main(filepath);