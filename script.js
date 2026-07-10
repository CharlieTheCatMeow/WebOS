//Welcome Screen variables
const welcomeScreen = document.querySelector("#welcomeScreen");
const welcomeScreenClose = document.querySelector("#closeWelcomeScreenWindow");
const welcomeScreenOpen = document.querySelector("#openWelcomeScreenWindow");

//Stopwatch variables
const stopwatch = document.querySelector("#stopwatch");
const stopwatchClose = document.querySelector("#closeStopwatchWindow");
const stopwatchOpen = document.querySelector("#openStopwatchWindow");

//Notes variables
const notes = document.querySelector("#notes");
const notesClose = document.querySelector("#closeNotesWindow");
const notesOpen = document.querySelector("#openNotesWindow");

//To-Do List variables
const todoList = document.querySelector("#todoList");
const todoListClose = document.querySelector("#closeTodoWindow");
const todoListOpen = document.querySelector("#openTodoWindow");

//Terminal variables
const terminal = document.querySelector("#terminal");
const terminalOpen = document.querySelector("#openTerminalWindow");
const terminalClose = document.querySelector("#closeTerminalWindow");

//Calculator variables
const calculator = document.querySelector("#calculator");
const calculatorOpen = document.querySelector("#openCalculatorWindow");
const calculatorClose = document.querySelector("#closeCalculatorWindow");

//Music player variables
const musicPlayer = document.querySelector("#musicPlayer");
const musicPlayerOpen = document.querySelector("#openMusicPlayerWindow");
const musicPlayerClose = document.querySelector("#closeMusicPlayerWindow");

//double clicking easter egg
const doubleClickingTip = document.querySelector("#doubleClickTipEasterEgg");
const doubleClickingTipOpen = document.querySelector("#openDoubleClickTipEasterEgg");
const doubleClickingTipClose = document.querySelector("#closeDoubleClickTipEasterEgg");

//top bar variables
const topBar = document.querySelector("#top_bar");
const timeText = document.querySelector("#clockTime");
const topBarDoubleClickingTip = document.querySelector("#topBarDoubleClickingTip");

let selectedIcon = undefined;
const icons = document.querySelectorAll(".app_icon");

let biggestIndex = 1;

//clock
function updateTime() {
    const now = new Date()
    timeText.innerHTML = now.toLocaleDateString('en-US', {weekday: 'short'}) + ' ' + now.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: false});
}
setInterval(updateTime, 1000);

topBarDoubleClickingTip.addEventListener("click", function () {
    if (topBarDoubleClickingTip.classList.contains("top_bar_double_clicking_tip_selected")) {
        topBarDoubleClickingTip.classList.remove("top_bar_double_clicking_tip_selected");
        openWindow(doubleClickingTip);
        topBarDoubleClickingTip.classList.add("top_bar_double_clicking_tip_animation");
        setTimeout(function () {
           closeWindow(doubleClickingTip);
        }, 1000);
        setTimeout(function () {
            topBarDoubleClickingTip.classList.remove("top_bar_double_clicking_tip_animation");
        }, 400);
    } else {
        topBarDoubleClickingTip.classList.add("top_bar_double_clicking_tip_selected");
        setTimeout(function () {
            topBarDoubleClickingTip.classList.remove("top_bar_double_clicking_tip_selected");
        }, 400);
    }
});

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
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.closest(".notes_sidebar")) {
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

        if (windowNextPositionY > topBarHeight) {
            element.style.top = windowNextPositionY + "px";
        } else {
            element.style.top = topBarHeight + "px";
        }
        element.style.left = (element.offsetLeft - currentX) + "px";
    }
    function stopDragging() {
        element.classList.remove("window_dragging");
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

//open and close windows
function closeWindow(element) {
    element.classList.add("window_closed");
    setTimeout(function () {
        element.style.display = "none";

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
        element.style.top = ((window.innerHeight - height) / 2) + "px";
        element.style.left = ((window.innerWidth - width) / 2) + "px";
        element.style.transform = "none";
        element.dataset.positioned = "true";
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
}

//selecting icons
function selectIcon(element) {
    if (selectedIcon && selectedIcon !== element) {
        deselectIcon(selectedIcon);
    }
    element.classList.add("icon_selected");
    selectedIcon = element;

    setTimeout(function () {
        if (selectedIcon == element) {
            deselectIcon(element);
        }
    }, 300);
}
function deselectIcon(element) {
    element.classList.remove("icon_selected");
    selectedIcon = undefined;
}
function iconTap(element) {
    if (element.classList.contains("icon_selected")) {
        deselectIcon(element);

        element.classList.add("icon_pop");
        setTimeout(function () {
            element.classList.remove("icon_pop");
        }, 400);

        let targetWindowID = element.getAttribute("data-window");
        let targetWindow = document.getElementById(targetWindowID);

        if (targetWindow) {
            openWindow(targetWindow);
        }
    } else {
        selectIcon(element);
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

//icons
icons.forEach(function (icon) {
    icon.addEventListener("click", function () {
        iconTap(icon);
    });
});


function initializeWindow(element, elementOpen, elementClose) {
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
    addWindowTapHandling(element);
}

initializeWindow(welcomeScreen, welcomeScreenOpen, welcomeScreenClose);
initializeWindow(stopwatch, stopwatchOpen, stopwatchClose);
initializeWindow(notes, notesOpen, notesClose);
initializeWindow(todoList, todoListOpen, todoListClose);
initializeWindow(terminal, terminalOpen, terminalClose);
initializeWindow(calculator, calculatorOpen, calculatorClose);
initializeWindow(musicPlayer, musicPlayerOpen, musicPlayerClose);
initializeWindow(doubleClickingTip, doubleClickingTipOpen, doubleClickingTipClose);