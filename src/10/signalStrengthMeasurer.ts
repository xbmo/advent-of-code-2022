import { MachineState } from "./machineState";

export class SignalStrengthMeasurer {
    private sum: number = 0;

    constructor() {}

    private isTargetCycle(cycle: number): boolean {
        if (cycle > 220) {
            return false;
        }

        // looking for the 20th cycle, and every 40th cycle after that
        return (cycle + 20) % 40 == 0;
    }

    checkSignalStrengthFromMachineState(machineState: MachineState) : void {
        if (!this.isTargetCycle(machineState.cycle)) {
            return;
        }

        let signalStrength = machineState.cycle * machineState.register_x;
        this.sum += signalStrength;
    }

    getSum(): number {
        return this.sum;
    }
}