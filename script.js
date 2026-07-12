//Welcome Screen variables
const welcomeScreen = document.querySelector("#welcomeScreen");
const welcomeScreenContent = document.querySelector("#welcomeScreenContent");
const welcomeScreenClose = document.querySelector("#closeWelcomeScreenWindow");
const welcomeScreenOpen = document.querySelector("#openWelcomeScreenWindow");
const welcomeScreenMaximizeButton = document.querySelector("#welcomeScreenMaximizeButton");

//Stopwatch variables
const stopwatch = document.querySelector("#stopwatch");
const stopwatchContent = document.querySelector("#stopwatchContent");
const stopwatchClose = document.querySelector("#closeStopwatchWindow");
const stopwatchOpen = document.querySelector("#openStopwatchWindow");
const stopwatchMaximizeButton = document.querySelector("#stopwatchMaximizeButton");

//Notes variables
const notes = document.querySelector("#notes");
const notesContent = document.querySelector("#notesContent");
const notesClose = document.querySelector("#closeNotesWindow");
const notesOpen = document.querySelector("#openNotesWindow");
const notesMaximizeButton = document.querySelector("#notesMaximizeButton");

//To-Do List variables
const todoList = document.querySelector("#todoList");
const todoListContent = document.querySelector("#todoListContent");
const todoListClose = document.querySelector("#closeTodoWindow");
const todoListOpen = document.querySelector("#openTodoWindow");
const todoListMaximizeButton = document.querySelector("#todoListMaximizeButton");

//Terminal variables
const terminal = document.querySelector("#terminal");
const terminalContent = document.querySelector("#terminalContent");
const terminalOpen = document.querySelector("#openTerminalWindow");
const terminalClose = document.querySelector("#closeTerminalWindow");
const terminalMaximizeButton = document.querySelector("#terminalMaximizeButton");

//Calculator variables
const calculator = document.querySelector("#calculator");
const calculatorContent = document.querySelector("#calculatorContent");
const calculatorOpen = document.querySelector("#openCalculatorWindow");
const calculatorClose = document.querySelector("#closeCalculatorWindow");
const calculatorMaximizeButton = document.querySelector("#calculatorMaximizeButton");

//Music player variables
const musicPlayer = document.querySelector("#musicPlayer");
const musicPlayerContent = document.querySelector("#musicPlayerContent");
const musicPlayerOpen = document.querySelector("#openMusicPlayerWindow");
const musicPlayerClose = document.querySelector("#closeMusicPlayerWindow");
const musicPlayerMaximizeButton = document.querySelector("#musicPlayerMaximizeButton");

//Gallery variables
const gallery = document.querySelector("#gallery");
const galleryContent = document.querySelector("#galleryContent");
const galleryOpen = document.querySelector("#openGalleryWindow");
const galleryClose = document.querySelector("#closeGalleryWindow");
const galleryMaximizeButton = document.querySelector("#galleryMaximizeButton");

//Settings variables
const settings = document.querySelector("#settings");
const settingsContent = document.querySelector("#settingsContent");
const settingsOpen = document.querySelector("#openSettingsWindow");
const settingsClose = document.querySelector("#closeSettingsWindow");
const settingsMaximizeButton = document.querySelector("#settingsMaximizeButton");

//Browser variables
const browser = document.querySelector("#browser");
const browserContent = document.querySelector("#browserContent");
const browserOpen = document.querySelector("#openBrowserWindow");
const browserClose = document.querySelector("#closeBrowserWindow");
const browserMaximizeButton = document.querySelector("#browserMaximizeButton");

//Files variables
const files = document.querySelector("#files");
const filesContent = document.querySelector("#filesContent");
const filesOpen = document.querySelector("#openFilesWindow");
const filesClose = document.querySelector("#closeFilesWindow");
const filesMaximizeButton = document.querySelector("#filesMaximizeButton");

//Search menu
const searchMenu = document.querySelector("#searchMenu");

//Control widget
const controlWidget = document.querySelector("#controlWidget");

//Top bar variables
const topBar = document.querySelector("#topBar");
const timeText = document.querySelector("#clockTime");

//desktop
const desktop = document.querySelector("#desktop");

let selectedIcon = undefined;
const icons = document.querySelectorAll(".app_icon");

let biggestIndex = 1;

//clock
function updateTime() {
    const now = new Date()
    timeText.innerHTML = now.toLocaleDateString('en-US', {weekday: 'short'}) + ' ' + now.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: false});
}
setInterval(updateTime, 1000);

//dragging windows
function dragElement(element) {
    let initialX = 0;
    let initialY = 0;
    let currentX = 0;
    let currentY = 0;
    if (document.getElementById(element.id + "Header")) {
        document.getElementById(element.id + "Header").onmousedown = startDragging;
    } else {
        element.onmousedown = startDragging;
    }

    function startDragging(e) {
         if (element.classList.contains("no_dragging")) return;
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.closest(".notes_sidebar")) {
            return;
        }
        if (e.target.closest(".close_button") || e.target.closest(".maximize_button") || e.target.closest(".header_buttons")) {
            return;
        }
        e.preventDefault();

        element.classList.add("window_dragging");
        initialX = e.clientX;
        initialY = e.clientY;
        document.onmouseup = stopDragging;
        document.onmousemove = whileDragging;

    }

    function whileDragging(e) {
        e.preventDefault();
        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;

        let topBarHeight = window.innerHeight * 0.05;
        let windowNextPositionY = element.offsetTop - currentY;
        let windowNextPositionX = element.offsetLeft - currentX;

        const rect = element.getBoundingClientRect();
        let maxLeft = window.innerWidth - rect.width;
        let maxTop = window.innerHeight - rect.height;

        if (windowNextPositionY < topBarHeight) {
            windowNextPositionY = topBarHeight;
        } else if (windowNextPositionY > maxTop) {
            windowNextPositionY = Math.max(maxTop, topBarHeight);
        }

        if (windowNextPositionX < 0) {
            windowNextPositionX = 0;
        } else if (windowNextPositionX > maxLeft) {
            windowNextPositionX = Math.max(maxLeft, 0);
        }

        element.style.top = windowNextPositionY + "px";
        element.style.left = windowNextPositionX + "px";
    }

    function stopDragging() {
        element.classList.remove("window_dragging");
        document.onmouseup = null;
        document.onmousemove = null;
    }

}

function clampWindowToViewport(element) {
    if (!element.dataset.positioned) return;
    if (element.id === "controlWidget") return;

    const topBarHeight = window.innerHeight * 0.05;
    const width = element.offsetWidth;
    const height = element.offsetHeight;

    const maxLeft = window.innerWidth - width;
    const maxTop = window.innerHeight - height;

    const currentLeft = parseFloat(element.style.left) || 0;
    const currentTop = parseFloat(element.style.top) || 0;

    const newLeft = Math.min(Math.max(currentLeft, 0), Math.max(maxLeft, 0));
    const newTop = Math.min(Math.max(currentTop, topBarHeight), Math.max(maxTop, topBarHeight));

    element.style.left = newLeft + "px";
    element.style.top = newTop + "px";
}

function clampAllOpenWindows() {
    document.querySelectorAll(".window").forEach(function (win) {
        if (win.style.display === "flex") {
            clampWindowToViewport(win);
        }
    });
}

let resizeDebounce;
window.addEventListener("resize", function () {
    clearTimeout(resizeDebounce);
    resizeDebounce = setTimeout(clampAllOpenWindows, 50);
});

function updateTopBarVisibility() {
    const anyMaximizedAndOpen = Array.from(document.querySelectorAll(".window.window_maximized")).some(win => win.style.display !== "none");
    topBar.style.display = anyMaximizedAndOpen ? "none" : "flex";
}

//open and close windows
function closeWindow(element) {
    element.classList.add("window_closed");
    setTimeout(function () {
        element.style.display = "none";
        updateTopBarVisibility();

        if (element.id === "terminal" && typeof terminalOpenClose === "function") {
            terminalOpenClose();
        }
    }, 200);
}
function openWindow(element) {
    if (!element.dataset.positioned) {
        element.style.display = "flex";
        void element.offsetWidth;
        const width = element.offsetWidth;
        const height = element.offsetHeight;

        const topBarHeight = window.innerHeight * 0.05;
        const maxLeft = window.innerWidth - width;
        const maxTop = window.innerHeight - height;

        let initialLeft = (window.innerWidth - width) / 2;
        let initialTop = (window.innerHeight - height) / 2;

        initialLeft = Math.min(Math.max(initialLeft, 0), Math.max(maxLeft, 0));
        initialTop = Math.min(Math.max(initialTop, topBarHeight), Math.max(maxTop, topBarHeight));

        if (!element.classList.contains("search_menu") && !element.classList.contains("control_widget")) {
            element.style.top = initialTop + "px";
            element.style.left = initialLeft + "px";
        } else if (element.classList.contains("control_widget")) {
            element.style.left = "auto";
        }
        element.dataset.positioned = "true";
    } else {
        if (element.id !== "controlWidget") {
            clampWindowToViewport(element);
        }
    }
    element.classList.add("window_closed")
    element.style.display = "flex";
    void element.offsetWidth;
    element.classList.remove("window_closed");
    biggestIndex++;
    element.style.zIndex = biggestIndex;
    topBar.style.zIndex = biggestIndex + 1;

    if (element.id === "terminal" && typeof terminalOpenClose === "function") {
        terminalOpenClose();
    }
    updateTopBarVisibility();
}

function deselectIcon(element) {
    if (!element) return;
    element.classList.remove("icon_selected");
    selectedIcon = undefined;
}
function iconTap(element) {
    element.classList.add("icon_pop");
    setTimeout(function () {
        element.classList.remove("icon_pop");
    }, 400);

    const targetWindowID = element.getAttribute("data-window");
    const targetWindow = document.getElementById(targetWindowID);

    if (targetWindow) {
        openWindow(targetWindow);
    }
}

//Window z-index
function addWindowTapHandling(element) {
    element.addEventListener("mousedown", () =>
        handleWindowTap(element)
    )
}
function handleWindowTap(element) {
    biggestIndex++;
    element.style.zIndex = biggestIndex;
    topBar.style.zIndex = biggestIndex + 1;
    deselectIcon(selectedIcon);
}

function switchToDarkMode() {
    const allWindows = document.querySelectorAll(".window");
    allWindows.forEach(function (win) {
        let winHeader = document.querySelector("#" + win.id + "Header");
        if (winHeader) {
            winHeader.classList.add("window_header_dark_mode");
        }
        win.classList.add("window_dark_mode");
    });
    topBar.classList.add("top_bar_dark_mode");
    desktop.classList.add("desktop_dark_mode")
    searchMenu.classList.add("search_menu_dark_mode");
    controlWidget.classList.add("control_widget_dark_mode");
    const controlWidgetSliders = document.getElementsByClassName("control_widget_slider");
    if (controlWidgetSliders) {
        for (let i = 0; i < controlWidgetSliders.length; i++) {
            controlWidgetSliders[i].classList.add("control_widget_slider_dark_mode");
        }
    }

    localStorage.setItem("Mode", "dark");
}

function switchToLightMode() {
    const allWindows = document.querySelectorAll(".window");
    allWindows.forEach(function (win) {
        let winHeader = document.querySelector("#" + win.id + "Header");
        if (winHeader) {
            winHeader.classList.remove("window_header_dark_mode");
        }
        win.classList.remove("window_dark_mode");
    });
    topBar.classList.remove("top_bar_dark_mode");
    desktop.classList.remove("desktop_dark_mode");
    searchMenu.classList.remove("search_menu_dark_mode");

    controlWidget.classList.remove("control_widget_dark_mode");
    const controlWidgetSliders = document.getElementsByClassName("control_widget_slider");
    if (controlWidgetSliders) {
        for (let i = 0; i < controlWidgetSliders.length; i++) {
            controlWidgetSliders[i].classList.remove("control_widget_slider_dark_mode");
        }
    }

    localStorage.setItem("Mode", "light");
}

function checkLightDarkMode() {
    if (localStorage.getItem("Mode") === "dark") {
        switchToDarkMode();
    } else if (localStorage.getItem("Mode") === "light") {
        switchToLightMode();
    }
}

//icons
icons.forEach(function (icon) {
    icon.addEventListener("click", function () {
        iconTap(icon);
    });
});


function initializeWindow(element, elementContent, elementOpen, elementClose, elementMaximize) {
    if (!element) return;
    dragElement(element);
    closeWindow(element);
    if (elementClose) {
        elementClose.addEventListener("click", function () {
            closeWindow(element);
        });
    }
    if (elementOpen) {
        elementOpen.addEventListener("click", function () {
            openWindow(element);
        })
    }
    if (elementMaximize) {
        elementMaximize.addEventListener("click", function () {
            if (element.classList.contains("window_maximized")) {
                element.classList.remove("window_maximized");
                element.classList.remove("no_dragging");
                elementContent.classList.remove("window_maximized");
                if (element.id === "browser") {
                    const browserWebContent = document.querySelector("#browserWebContent");
                    browserWebContent.classList.remove("window_maximized");
                }

                const restoredTop = element.preMaximizeTop !== undefined ? element.preMaximizeTop : (window.innerHeight - element.offsetHeight) / 2;
                const restoredLeft = element.preMaximizeLeft !== undefined ? element.preMaximizeLeft : (window.innerWidth - element.offsetWidth) / 2;

                element.style.top = restoredTop + "px";
                element.style.left = restoredLeft + "px";
            } else {
                const rect = element.getBoundingClientRect();
                element.preMaximizeTop = rect.top;
                element.preMaximizeLeft = rect.left;

                element.classList.add("window_maximized");
                element.classList.add("no_dragging");
                elementContent.classList.add("window_maximized");
                if (element.id === "browser") {
                    const browserWebContent = document.querySelector("#browserWebContent");
                    browserWebContent.classList.add("window_maximized");
                }
            }
            updateTopBarVisibility();
        });
    }
    addWindowTapHandling(element);
}

initializeWindow(welcomeScreen, welcomeScreenContent, welcomeScreenOpen, welcomeScreenClose, welcomeScreenMaximizeButton);
initializeWindow(stopwatch, stopwatchContent, stopwatchOpen, stopwatchClose, stopwatchMaximizeButton);
initializeWindow(notes, notesContent, notesOpen, notesClose, notesMaximizeButton);
initializeWindow(todoList, todoListContent, todoListOpen, todoListClose, todoListMaximizeButton);
initializeWindow(terminal, terminalContent, terminalOpen, terminalClose, terminalMaximizeButton);
initializeWindow(calculator, calculatorContent, calculatorOpen, calculatorClose, calculatorMaximizeButton);
initializeWindow(musicPlayer, musicPlayerContent, musicPlayerOpen, musicPlayerClose, musicPlayerMaximizeButton);
initializeWindow(gallery, galleryContent, galleryOpen, galleryClose, galleryMaximizeButton);
initializeWindow(searchMenu, null, null, null, null);
initializeWindow(settings, settingsContent, settingsOpen, settingsClose, settingsMaximizeButton);
initializeWindow(browser, browserContent, browserOpen, browserClose, browserMaximizeButton);
initializeWindow(files, filesContent, filesOpen, filesClose, filesMaximizeButton);
initializeWindow(controlWidget, null, null, null, null);

checkLightDarkMode();