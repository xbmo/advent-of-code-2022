export interface IStack<T> {
    push(item: T): void;
    pop() : T | undefined;
    peek(): T | undefined;
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

    peek(): T | undefined {
        return this.storage[this.storage.length - 1];
    }

    size() : number {
        return this.storage.length;
    }
}