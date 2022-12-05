import { parse } from "path";
import { iterateFileLineByLine } from "../common/fileLoading";

function partOne(filepath : string) : void {
    
    // represents the number of pairs where one set of numbers is fully contained by the other
    let numberOfPairs = 0;
    iterateFileLineByLine(filepath, (line) => {
        let perElfSplit = line.split(",");
        let elf1Sections = perElfSplit[0].split("-");
        let elf2Sections = perElfSplit[1].split("-");

        let elf1MinMax: [number, number] = [parseInt(elf1Sections[0]), parseInt(elf1Sections[1])];
        let elf2MinMax: [number, number] = [parseInt(elf2Sections[0]), parseInt(elf2Sections[1])];

        let elf1Length = elf1MinMax[1] - elf1MinMax[0];
        let elf2Length = elf2MinMax[1] - elf2MinMax[0];

        let firstElfMinMax = elf1Length > elf2Length ? elf1MinMax : elf2MinMax;
        let secondElfMinMax = firstElfMinMax == elf1MinMax ? elf2MinMax : elf1MinMax;

        if (secondElfMinMax[0] >= firstElfMinMax[0] && secondElfMinMax[1] <= firstElfMinMax[1]) {
            numberOfPairs++;
        }
    });

    console.log("Total pairs contained = " + numberOfPairs);
}

function partTwo(filepath : string) : void {
    
    // represents the number of pairs where one set of numbers is fully contained by the other
    let numberOfPairs = 0;
    iterateFileLineByLine(filepath, (line) => {
        let perElfSplit = line.split(",");
        let elf1Sections = perElfSplit[0].split("-");
        let elf2Sections = perElfSplit[1].split("-");

        let elf1MinMax: [number, number] = [parseInt(elf1Sections[0]), parseInt(elf1Sections[1])];
        let elf2MinMax: [number, number] = [parseInt(elf2Sections[0]), parseInt(elf2Sections[1])];

        let elf1Length = elf1MinMax[1] - elf1MinMax[0];
        let elf2Length = elf2MinMax[1] - elf2MinMax[0];

        let firstElfMinMax = elf1Length > elf2Length ? elf1MinMax : elf2MinMax;
        let secondElfMinMax = firstElfMinMax == elf1MinMax ? elf2MinMax : elf1MinMax;

        if ((secondElfMinMax[0] >= firstElfMinMax[0] && secondElfMinMax[1] <= firstElfMinMax[1]) || 
            (secondElfMinMax[0] < firstElfMinMax[0] && secondElfMinMax[1] >= firstElfMinMax[0]) ||
            (secondElfMinMax[0] <= firstElfMinMax[1] && secondElfMinMax[1] > firstElfMinMax[1])) {
            numberOfPairs++;
        }
    });

    console.log("Total pairs overlap = " + numberOfPairs);
}

//let filepath = "../../data/04/test_04.txt";
let filepath = "../../data/04/data_04.txt";
partOne(filepath);
partTwo(filepath);