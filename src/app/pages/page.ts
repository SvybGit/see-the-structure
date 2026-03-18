export interface Page {
    /**
     * Renders the page content into the given container element
     * @param container 
     */
    render(container: HTMLElement): void;
}
