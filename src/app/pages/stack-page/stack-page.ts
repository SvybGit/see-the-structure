import { Stack } from "../../../data-structures/stack";
import type { Page } from "../page";
import stackPageHTML from "./stack-page.html?raw";

export class StackPage implements Page {
    private static readonly MAX_STACK_SIZE = 8;
    private static readonly STACK_ITEM_CLASS = "rounded-xl border border-[rgb(var(--color-text)_/_0.08)] bg-linear-to-r from-[rgb(var(--color-background-glow)_/_0.95)] via-[rgb(var(--color-primary)_/_0.9)] to-[rgb(var(--color-primary)_/_0.75)] px-3 py-2 text-center text-sm font-semibold tracking-wide text-[rgb(var(--color-text))] shadow-lg shadow-fuchsia-950/20 sm:px-4 sm:py-2.5 xl:py-3";
    private static readonly EMPTY_STATE_CLASS = "flex h-full items-center justify-center rounded-[1.25rem] border border-dashed border-[rgb(var(--color-text)_/_0.08)] bg-[rgb(var(--color-text)_/_0.03)] px-6 text-center text-sm leading-7 text-[rgb(var(--color-text)_/_0.55)]";
    private static readonly FULL_STATE_CLASS = "rounded-xl border border-[rgb(var(--color-text)_/_0.08)] bg-[rgb(var(--color-text)_/_0.06)] px-4 py-2 text-center text-sm font-medium text-[rgb(var(--color-text)_/_0.92)] sm:py-2.5 xl:py-3";

    private stackStructure: Stack<string> = new Stack<string>();
    private input!: HTMLInputElement;
    private stackContainer!: HTMLElement;
    private pushButton!: HTMLButtonElement;
    private popButton!: HTMLButtonElement;
    private clearButton!: HTMLButtonElement;

    private content(): string {
        return stackPageHTML;
    }

    private initialize(): void {
        this.input = this.getRequiredElement<HTMLInputElement>("input");
        this.stackContainer = this.getRequiredElement("stack-items");
        this.pushButton = this.getRequiredElement<HTMLButtonElement>("push-btn");
        this.popButton = this.getRequiredElement<HTMLButtonElement>("pop-btn");
        this.clearButton = this.getRequiredElement<HTMLButtonElement>("clear-btn");

        this.preventButtonFocus(this.pushButton, this.popButton, this.clearButton);
        this.pushButton.addEventListener("click", () => this.handlePush());
        this.popButton.addEventListener("click", () => this.handlePop());
        this.clearButton.addEventListener("click", () => this.handleClear());
        this.input.focus();
    }

    private getRequiredElement<T extends HTMLElement = HTMLElement>(id: string): T {
        const element = document.getElementById(id);
        if (!(element instanceof HTMLElement)) {
            throw new Error(`Missing required element: ${id}`);
        }

        return element as T;
    }

    private preventButtonFocus(...buttons: HTMLButtonElement[]): void {
        for (const button of buttons) {
            button.addEventListener("mousedown", (event) => {
                event.preventDefault();
            });
        }
    }

    private handlePush(): void {
        const inputValue = this.getInputValue();
        if (inputValue.length === 0 || this.isFull()) {
            this.focusInput();
            return;
        }

        this.stackStructure.push(inputValue);
        this.renderStack();
        this.focusInput();
    }

    private handlePop(): void {
        if (this.stackStructure.isEmpty()) {
            this.focusInput();
            return;
        }

        this.stackStructure.pop();
        this.renderStack();
        this.focusInput();
    }

    private handleClear(): void {
        this.stackStructure.clear();
        this.renderStack();
        this.focusInput();
    }

    private focusInput(): void {
        this.input.focus();
    }

    private isFull(): boolean {
        return this.stackStructure.size >= StackPage.MAX_STACK_SIZE;
    }

    private getInputValue(): string {
        const inputValue = this.input.value.trim();
        this.input.value = "";
        return inputValue;
    }

    private createStackElement(value: string): HTMLElement {
        const element = document.createElement("div");
        element.className = StackPage.STACK_ITEM_CLASS;
        element.dataset.role = "stack-item";
        element.textContent = value;
        return element;
    }

    private renderStack() {
        this.stackContainer.innerHTML = "";
        this.updateControls();

        if (this.stackStructure.isEmpty()) {
            this.stackContainer.appendChild(this.createEmptyStateElement());
            return;
        }

        if (this.isFull()) {
            this.stackContainer.appendChild(this.createFullStateElement());
        }

        for (const value of this.stackStructure) {
            this.stackContainer.appendChild(this.createStackElement(value));
        }
    }

    private updateControls(): void {
        this.pushButton.disabled = this.isFull();
        this.popButton.disabled = this.stackStructure.isEmpty();
        this.clearButton.disabled = false;
    }

    private createEmptyStateElement(): HTMLElement {
        const emptyState = document.createElement("div");
        emptyState.className = StackPage.EMPTY_STATE_CLASS;
        emptyState.textContent = "The stack is empty.";
        return emptyState;
    }

    private createFullStateElement(): HTMLElement {
        const fullState = document.createElement("div");
        fullState.className = StackPage.FULL_STATE_CLASS;
        fullState.textContent = "The stack is full!";
        return fullState;
    }

    public render(container: HTMLElement): void {
        container.innerHTML = this.content();
        this.initialize();
        this.renderStack();
    }
}
