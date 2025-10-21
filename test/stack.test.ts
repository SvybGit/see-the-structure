import { expect, test } from 'vitest'
import { Stack } from '../src/data-structures/stack'

test('Empty stack creation', () => {
    const stack = new Stack();

    expect(stack.size).toBe(0);
    expect(stack.peek()).toBe(undefined);
});

test('Stack creation with elements', () => {
    const values = [1,2,3,4,5,6];
    let size = values.length;
    const stack = new Stack(values);

    expect(stack.size).toBe(size);
    expect(stack.peek()).toBe(6);

    for (const value of values.toReversed()) {
        expect(stack.pop()).toBe(value);
        expect(stack.size).toBe(size - 1);
        size--;
    }
});

test('Pop', () => {
    const values = [1,2,3,4,5,6];
    let size = values.length;
    const stack = new Stack(values)

    expect(stack.size).toBe(size);
    expect(stack.peek()).toBe(6)

    for (const value of values.toReversed()) {
        expect(stack.pop()).toBe(value);
        expect(stack.size).toBe(size - 1);
        size--;
    }
});

test('Push', () => {
    const values = [1,2,3,4,5,6];
    let size = 0;
    const stack = new Stack();
    for (const value of values) {
        stack.push(value);
        size++;
        expect(stack.peek()).toBe(value);
        expect(stack.size).toBe(size);
    }

    for (const value of values.toReversed()) {
        expect(stack.pop()).toBe(value);
        expect(stack.size).toBe(size - 1);
        size--;
    }
});

test('Pop on empty', () => {
    const stack = new Stack();
    expect(() => stack.pop()).toThrowError(new RangeError("The stack is empty"));
});

test('isEmpty', () => {
    const stack = new Stack();
    expect(stack.isEmpty()).toBe(true);
});

test('Clear', () => {
    const values = [1,2,3,4,5,6];
    const stack = new Stack(values);

    stack.clear();
    expect(stack.peek()).toBe(undefined);
    expect(stack.size).toBe(0);
    expect(stack.isEmpty()).toBe(true);
});

