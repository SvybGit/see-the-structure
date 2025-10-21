class StackNode<T> {
    private nextNode?: StackNode<T>;
    public readonly value: T;

    constructor(value: T, nextNode?: StackNode<T>) {
        this.value = value;
        this.nextNode = nextNode;
    }

    public next() {
        return this.nextNode;
    }

    public unlink() {
        this.nextNode = undefined;
    }
}

export class Stack<T> implements Iterable<T> {
    private topNode?: StackNode<T>;
    private internalSize: number = 0;

    get size() {
        return this.internalSize;
    }

    /**
     * Instantiates a Stack data structure
     * @param values are going to be pushed into the stack in forward order eg. last element will be popped first
     */
    constructor(values?: Iterable<T>) {
        if (values !== undefined) {
            for (const value of values) {
                this.push(value)
            }
        }
    }

    *[Symbol.iterator](): IterableIterator<T> {
        let current = this.topNode;
        while (current) {
            yield current.value;
            current = current.next();
        }
    }

    public push(value: T): void {
        this.internalSize++;
        this.topNode = new StackNode(value, this.topNode);
    }

    public pop(): T {
        if (this.isEmpty()) {
            throw new RangeError("The stack is empty");
        }
        const popped = this.topNode!;
        this.topNode = popped.next();
        popped.unlink();
        this.internalSize--;
        return popped.value;
    }

    public peek(): T | undefined {
        return this.topNode?.value;
    }

    public isEmpty() {
        return this.topNode === undefined;
    }

    public clear() {
        this.topNode = undefined;
        this.internalSize = 0;
    }
}