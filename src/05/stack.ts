export interface IStack<T> {
    push(item: T): void;
    pop() : T | undefined;
    size(): number;
}

export class Stack<T> implements IStack<T> {
    private storage: T[] = [];

    constructor() {}

    push(item : T) : void {
        this.storage.push(item);
    }

    pop(): T | undefined {
        return this.storage.pop();
    }

    size() : number {
        return this.storage.length;
    }
}