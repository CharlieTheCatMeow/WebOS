const startMenu = document.querySelector("#startMenu");
const enterDesktopButton = document.querySelector("#enterDesktopButton");

const loadingScreen = document.querySelector("#loadingScreen");
const loadingScreenProgressBar = document.querySelector("#loadingProgress");
const loadingText = document.querySelector("#loadingText");

let loadingProgress = 0;
let pageLoaded = false;
const totalPathLength = 280;

let reached80 = false;
let reached99 = false;

function setCatStroke(progressVal) {
    const offset = totalPathLength - (progressVal / 100) * totalPathLength;
    loadingScreenProgressBar.style.strokeDashoffset = offset;
}

const loadingInterval = setInterval(function () {
    if (pageLoaded) return;

    if (loadingProgress < 80) {
        loadingProgress += 1;
    } else if (loadingProgress < 99 && loadingProgress >= 80) {
        loadingProgress += 0.1;

        if (!reached80) {
            loadingText.innerHTML = "<span>F</span><span>i</span><span>n</span><span>a</span><span>l</span><span>i</span><span>z</span><span>i</span><span>n</span><span>g</span><span>.</span><span>.</span><span>.</span>";
            reached80 = true;
        }
    } else if (loadingProgress >= 99) {
        loadingProgress = 99;

        if (!reached99) {
            loadingText.innerHTML = "<span>A</span><span>l</span><span>m</span><span>o</span><span>s</span><span>t</span><span>&nbsp;</span><span>t</span><span>h</span><span>e</span><span>r</span><span>e</span><span>!</span>";
            reached99 = true;
        }
    }

    setCatStroke(loadingProgress);
}, 50);

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

window.addEventListener("load", function () {
    setTimeout(function () {
        pageLoaded = true;
        clearInterval(loadingInterval);
        loadingScreenProgressBar.style.transition = "stroke-dashoffset 0.3s ease-out";
        loadingText.classList.add("no_animation")
        loadingText.innerHTML = "<span>L</span><span>o</span><span>a</span><span>d</span><span>i</span><span>n</span><span>g</span><span>&nbsp;</span><span>f</span><span>i</span><span>n</span><span>i</span><span>s</span><span>h</span><span>e</span><span>d</span><span>!</span>";

        setTimeout(function () {
            setCatStroke(100);
        }, 10);
        setTimeout(function () {
            loadingScreen.classList.add("loading_screen_hidden");
            setTimeout(function () {
                loadingScreen.style.display = "none";
            }, 400);
        }, 800);
    }, 2000);
});

enterDesktopButton.addEventListener("click", function () {
    enterDesktop();
});