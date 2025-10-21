class StackNode<T> {
    public nextNode?: StackNode<T>;
    public value: T;

    constructor(value: T, nextNode?: StackNode<T>) {
        this.value = value;
        this.nextNode = nextNode;
    }
}

class Stack<T> {
    private topNode?: StackNode<T>;
    private size: number = 0;

    constructor(values?: T[]) {
        if (values !== undefined) {
            values.forEach(value => this.push(value))
        }
    }

    public push(value: T): void {
        this.size++;
        if (this.topNode === undefined) {
            this.topNode = new StackNode(value);
        } else {
            const oldTopNode = this.topNode;
            this.topNode = new StackNode(value, oldTopNode);
        }
    }

    public pop(): T | undefined {
        if (this.topNode !== undefined)
            this.topNode = this.topNode?.nextNode;
            const value = this.peek();
            this.size--;
            return value
    }

    public  peek(): T | undefined {
        return this.topNode?.value;
    }

}