const topBarSearchMenuButton = document.querySelector("#topBarSearchMenuButton");
const searchMenuWindow = document.querySelector("#searchMenu");

topBarSearchMenuButton.addEventListener("click", function () {
    if (searchMenuWindow.style.display === "none") {
        openWindow(searchMenuWindow);
    } else {
        closeWindow(searchMenuWindow);
    }
});