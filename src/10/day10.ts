import { loadFileAsStringArrayOfLines } from "../common/fileLoading"
import { InstructionState, NoopInstructionState, AddxInstructionState} from "./instructions"
import { MachineState } from "./machineState"
import { SignalStrengthMeasurer } from "./signalStrengthMeasurer"
import { CRTRenderer } from './crtRenderer'

function main(filepath: string) {
    let instructionsArray = loadFileAsStringArrayOfLines(filepath);
    
    let instructionsMap = new Map<string, InstructionState>;
    instructionsMap.set("noop", new NoopInstructionState());
    instructionsMap.set("addx", new AddxInstructionState());

    let machineState = new MachineState();

    let signalStrengthMeasurer = new SignalStrengthMeasurer();
    let crtRenderer = new CRTRenderer();

    let instructionIndex: number = 0;
    while (instructionIndex < instructionsArray.length) {
        let instructionLine = instructionsArray[instructionIndex];
        let split = instructionLine.split(" ");
        let instructionName: string = split[0];
        let instruction = instructionsMap.get(instructionName);

        if (instruction !== undefined) {
            if (instruction.onStart) {
                instruction.onStart(split[1]);
            }
            for (let i = 0; i < instruction.cyclesToExecute; i++) {
                machineState.cycle++;

                signalStrengthMeasurer.checkSignalStrengthFromMachineState(machineState);
                crtRenderer.render(machineState);
            }

            if (instruction.onExecute) {
                instruction.onExecute(machineState);
            }
        }

        instructionIndex++;
    }

    console.log("Target signal strength sum = " + signalStrengthMeasurer.getSum());
    crtRenderer.printOutput();
}

//let filepath = "../../data/10/test_10.txt";
let filepath = "../../data/10/data_10.txt";
main(filepath);