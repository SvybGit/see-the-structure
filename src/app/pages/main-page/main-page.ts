import type { Page } from "../page";
import mainPageHTML from "./main-page.html?raw";

export class MainPage implements Page {

    public content(): string {
        return mainPageHTML;
    }

    private initialize(): void {
    }

    public render(container: HTMLElement): void {
        container.innerHTML = this.content();
        this.initialize()
    }

}
