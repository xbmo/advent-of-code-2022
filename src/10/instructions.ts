import { MachineState } from "./machineState"

export interface InstructionState {
    readonly cyclesToExecute: number;
    onStart?(input: string): void;
    onCycle?(machineState: MachineState): void;
    onExecute?(machineState: MachineState): void;
}

export class NoopInstructionState implements InstructionState {
    cyclesToExecute: number = 1;
}

export class AddxInstructionState implements InstructionState {
    cyclesToExecute: number = 2;

    private amountToAdd: number = 0;

    onStart(input: string) :void {
        this.amountToAdd = parseInt(input); 
    }

    onExecute(machineState: MachineState) {
        machineState.register_x += this.amountToAdd;
    }
}