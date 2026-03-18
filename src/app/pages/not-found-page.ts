import type { Page } from "./page";

export class NotFoundPage implements Page {

    private content(): string {
        return /*html*/`
        <h1>404 not found</h1>
        `;
    }

    public render(container: HTMLElement): void {
        container.innerHTML = this.content();
    }
}
