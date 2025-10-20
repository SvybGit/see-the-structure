import { MainPage } from './pages/main-page/main-page';
import { StackPage } from "./pages/stack-page/stack-page.ts";
import { NotFoundPage } from './pages/not-found-page';
import { type Page } from './pages/page';

const pages: Record<string, Page> = {
    "main" : new MainPage(),
    "stack" : new StackPage()
}

function render() {
    const container = document.getElementById("app")!;
    container.innerHTML = "";
    const path = window.location.hash.slice(1) || "main";
    console.log(path);
    let page: Page = pages[path] ??  new NotFoundPage();
    page.render(container);
}

window.addEventListener("hashchange", render);
window.addEventListener("load", render);
