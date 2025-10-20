import type { Page } from "../page";
import stackPageHTML from "./stack-page.html?raw";

export class StackPage implements Page {

    public content(): string {
        return stackPageHTML;
    }

    private initialize(): void {
    }

    public render(container: HTMLElement): void {
        container.innerHTML = this.content();
        this.initialize()
    }

}
