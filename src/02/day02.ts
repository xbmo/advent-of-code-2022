import fs from 'fs'
import * as path from 'path'

function loadFileAsString(filepath : string) {
    let contents = fs.readFileSync(path.join(__dirname, filepath));
    return contents.toString();
}

function splitText(text : string) : string[] {
    return text.split("\r\n");
}

function scoreForOutcome(player: string, opponent: string) {
    const pointsForWin: number = 6;
    const pointsforDraw: number = 3;
    const pointsForLoss: number = 0;
    if (player == "X") {
        if (opponent == "B") {
            return pointsForLoss;
        }
        else if (opponent == "C") {
            return pointsForWin;
        }
    }
    else if (player == "Y") {
        if (opponent == "A") {
            return pointsForWin;
        }
        else if (opponent == "C") {
            return pointsForLoss;
        }
    }
    else if (player == "Z") {
        if (opponent == "A") {
            return pointsForLoss;
        }
        else if (opponent == "B") {
            return pointsForWin;
        }
    }

    return pointsforDraw;
}

function main() : void {
    //let filepath = "../../data/02/test_02.txt";
    let filepath = "../../data/02/data_02.txt";
    
    const lineArray = splitText(loadFileAsString(filepath));
    let totalScore : number = 0;

    let playerShapeScoreMap = new Map<string, number>([
        ["X", 1],
        ["Y", 2],
        ["Z", 3]
    ]);

    let lineIndex = 0;
    while (lineIndex < lineArray.length) {
        let line = lineArray[lineIndex];
        // retrieve A,B, or C value
        let opponent = line[0];

        // retrieve X, Y or Z value
        let player = line[2];

        let mapValue = playerShapeScoreMap.get(player);
        let playerShapeScore = mapValue !== undefined ? mapValue : 0;
        let outcomeScore = scoreForOutcome(player, opponent);
        let roundScore = playerShapeScore + outcomeScore;
        console.log(roundScore);

        totalScore += roundScore;

        lineIndex++;
    }

    console.log("Final Score = " + totalScore);
}

main();