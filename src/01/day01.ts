import fs from 'fs'
import * as path from 'path'

class ElfCalorieCounts {
    foodCaloriesList: number[];

    constructor() {
        this.foodCaloriesList = [];
    }

    addFoodCalories(foodCalories: number) {
        this.foodCaloriesList.push(foodCalories);
    }

    getCombinedCaloriesAmount() {
        let total: number = 0;
        for (let i = 0; i < this.foodCaloriesList.length; i++) {
            total += this.foodCaloriesList[i];
        }

        return total;
    }
}

function splitText(text : string) : string[] {
    return text.split("\r\n");
}

function main(): void {
    //let filepath = "../../data/01/test_01.txt";
    let filepath = "../../data/01/data_01.txt";
    
    let contents = fs.readFileSync(path.join(__dirname, filepath));

    let elfCalorieCountsList : ElfCalorieCounts[] = [];

    let lineArray = splitText(contents.toString());
    let currentElfCalorieCounts : ElfCalorieCounts | null = null;
    let lineIndex : number = 0;
    while (lineIndex < lineArray.length) {
        let line : string = lineArray[lineIndex];
        if (line == "") {
            if (currentElfCalorieCounts !== null) {
                elfCalorieCountsList.push(currentElfCalorieCounts);
                currentElfCalorieCounts = null;
            }
        }
        else {
            if (currentElfCalorieCounts === null) {
                currentElfCalorieCounts = new ElfCalorieCounts();
            }
            let calories : number = parseInt(line);
            currentElfCalorieCounts.addFoodCalories(calories);
        }

        lineIndex++;
    }

    if (currentElfCalorieCounts !== null) {
        elfCalorieCountsList.push(currentElfCalorieCounts);
    }

    let highestCalories : number = 0;
    let indexForHighestCalories : number = 0;
    for (let i = 0; i < elfCalorieCountsList.length; i++) {
        let caloriesForIndex = elfCalorieCountsList[i].getCombinedCaloriesAmount();
        if (caloriesForIndex > highestCalories) {
            highestCalories = caloriesForIndex;
            indexForHighestCalories = i;
        }
    }

    let highestCalorieCarryingElfNumber = indexForHighestCalories + 1;
    console.log("Final Result (index) = " + highestCalorieCarryingElfNumber);
    console.log("Final Result (calories) = " + highestCalories);
}

main();