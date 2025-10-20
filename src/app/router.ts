import mainPage from './pages/main-page.html?raw';
import stackPage from './pages/stack-page.html?raw';

function render() {
    const container = document.getElementById("app")!;
    container.innerHTML = "";
    const path = window.location.hash.slice(1) || "main";
    console.log(path);
    switch (path) {
        case "main":
            container.innerHTML = mainPage;
            break;
        case "stack":
            container.innerHTML = stackPage;
            break;
        default:
            container.innerHTML = /*html*/`
                <h1>404 not found</h1>
            `
            break;
    }
}

window.addEventListener("hashchange", render);
window.addEventListener("load", render);