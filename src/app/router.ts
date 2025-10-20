import mainPage from './pages/main-page.html?raw';

function render() {
    const container = document.getElementById("app")!;
    container.innerHTML = "";
    const path = window.location.hash.slice(1) || "main";
    console.log(path);
    switch (path) {
        case "main":
            container.innerHTML = mainPage;
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