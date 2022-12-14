import { MachineState } from "./machineState";

export class CRTRenderer {
    readonly screenSize:number = 240;
    readonly screenWidth: number = 40;
    screenArray: Array<string> = new Array<string>(this.screenSize);

    constructor() {
        this.clearScreen();
    }

    clearScreen(): void {
        for (let i = 0; i < this.screenSize; i++) {
            this.screenArray[i] = ".";
        }
    }

    isSpriteVisible(crtDrawPosition: number, spritePosition: number) {
        return (crtDrawPosition == spritePosition - 1) || (crtDrawPosition == spritePosition) || (crtDrawPosition == spritePosition + 1);
    }

    render(machineState: MachineState): void {
        let crtDrawPosition = machineState.cycle - 1;
        if (this.isSpriteVisible(crtDrawPosition % this.screenWidth, machineState.register_x)) {
            this.screenArray[crtDrawPosition] = "#";
        }
    }

    printOutput(): void {
        const outputWidth = this.screenWidth;
        const numRows = this.screenSize / outputWidth;
        for (let y = 0; y < numRows; y++) {
            let outputString = "";
            let startIndex = y * outputWidth;
            for (let x = startIndex; x < startIndex + outputWidth; x++) {
                outputString += this.screenArray[x];
            }
            console.log(outputString);
        }
    }
}