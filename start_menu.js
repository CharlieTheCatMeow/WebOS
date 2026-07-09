const startMenu = document.querySelector("#startMenu");
const enterDesktopButton = document.querySelector("#enterDesktopButton");
const topbarStartMenuButton = document.querySelector("#topBarStartMenuButton")

function enterDesktop() {
    enterDesktopButton.classList.add("enter_desktop_button_pressed");
    startMenu.classList.add("start_menu_hide");
    setTimeout(function () {
        enterDesktopButton.classList.remove("enter_desktop_button_pressed");
        startMenu.style.display = "none";
    }, 200);
}

function enterStartMenu() {
    startMenu.style.display = "flex";
    void startMenu.offsetWidth;
    startMenu.classList.remove("start_menu_hide");
}

enterDesktopButton.addEventListener("click", function () {
    enterDesktop();
});

topbarStartMenuButton.addEventListener("click", function () {
   enterStartMenu()
});