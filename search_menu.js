const topBarSearchMenuButton = document.querySelector("#topBarSearchMenuButton");
const topBarSearchMenuInput = document.querySelector("#searchMenuInput");
const searchMenuResults = document.querySelector("#searchMenuResults");
const searchMenuWindow = document.querySelector("#searchMenu");
const searchMenuPowerButton = document.querySelector("#searchMenuPowerButton");

apps = [{name: "Introduction",
        content: `<div id="searchMenuWelcomeScreen" class="search_menu_app_icon no_select" data-window="welcomeScreen">
                        <img class="app_icon_svg" src="Images/Favicon.svg" alt="Intro">
                    </div>`},
        {name: "Stopwatch",
         content: `<div id="searchMenuStopwatch" class="search_menu_app_icon no_select" data-window="stopwatch">
                        <img class="app_icon_svg" src="Images/stopwatch.svg" alt="Timer">
                    </div>`},
        {name: "Notes",
         content: `<div id="searchMenuNotes" class="search_menu_app_icon no_select" data-window="notes">
                        <img class="app_icon_svg" src="Images/notes.svg" alt="Notes">
                    </div>`},
        {name: "To-Do List",
         content: `<div id="searchMenuTodoList" class="search_menu_app_icon no_select" data-window="todoList">
                        <img class="app_icon_svg" src="Images/todo_list.svg" alt="To-Do">
                    </div>`},
        {name: "Calculator",
         content: `<div id="searchMenuCalculator" class="search_menu_app_icon no_select" data-window="calculator">
                        <img class="app_icon_svg" src="Images/calculator.svg" alt="Calc">
                    </div>`},
        {name: "Music Player",
         content: `<div id="searchMenuMusicPlayer" class="search_menu_app_icon no_select" data-window="musicPlayer">    
                        <img class="app_icon_svg" src="Images/music_player.svg" alt="Music">
                    </div>`},
        {name: "Gallery",
         content: `<div id="searchMenuGallery" class="search_menu_app_icon no_select" data-window="gallery">
                        <img class="app_icon_svg" src="Images/gallery.svg" alt="Gallery">
                    </div>`},
        {name: "Settings",
         content: `<div id="searchMenuSettings" class="search_menu_app_icon no_select" data-window="settings">
                        <img class="app_icon_svg" src="Images/settings.svg" alt="Settings">
                    </div>`},
        {name: "Terminal",
         content: `<div id="searchMenuTerminal" class="search_menu_app_icon no_select" data-window="terminal">
                        <img class="app_icon_svg" src="Images/terminal.svg" alt="CMD">
                    </div>`}
        ];

appResults = [];

function searchForApps(input) {
    appResults = [];
    apps.forEach(function (app) {
        if (app.name.toLowerCase().includes(input.toLowerCase())) {
            appResults.push(app);
        }
    });
}

function displayAppResults() {
    searchMenuResults.innerHTML = "";
    if (appResults.length > 0) {
        appResults.forEach(function (app) {
            searchMenuResults.innerHTML += app.content;
        });
    } else {
        searchMenuResults.innerHTML = `<p class="no_results">No results found :3</p>`;
    }
}

searchForApps("");
displayAppResults();

topBarSearchMenuInput.addEventListener("input", function () {
    const input = topBarSearchMenuInput.value;
    searchForApps(input);
    displayAppResults();
});

searchMenuResults.addEventListener("click", function (event) {
    const icon = event.target.closest(".search_menu_app_icon");
    if (!icon) return;

    const windowName = icon.dataset.window;
    const windowElement = document.querySelector("#" + windowName);
    if (!windowElement) return;

    openWindow(windowElement);
});

topBarSearchMenuButton.addEventListener("click", function () {
    if (searchMenuWindow.style.display === "none") {
        openWindow(searchMenuWindow);
    } else {
        closeWindow(searchMenuWindow);
    }
});

searchMenuPowerButton.addEventListener("click", function () {
    closeWindow(searchMenuWindow);
    enterStartMenu();
});
