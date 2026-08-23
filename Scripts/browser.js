const browserURLBar = document.querySelector("#browserURLBar");
const browserWebContent = document.querySelector("#browserWebContent");
const browserHomeButton = document.querySelector("#browserHomeButton");

function openBrowserHomePage() {
    browserWebContent.innerHTML = `<div id="browserWikipediaButton" class="browser_homepage_selector clickable no_select">
                                        <img class="browser_homepage_icon" src="Images/wikipedia.svg" alt="Wikipedia">
                                    </div>
                                    <div id="browserDrawButton" class="browser_homepage_selector clickable no_select">
                                        <img class="browser_homepage_icon" src="Images/draw.svg" alt="Draw">
                                    </div>
                                    <div id="browserWeatherButton" class="browser_homepage_selector clickable no_select">
                                        <img class="browser_homepage_icon" src="Images/weather.svg" alt="Weather">
                                    </div>`;
    const browserWikipediaButton = document.querySelector("#browserWikipediaButton");
    const browserDrawButton = document.querySelector("#browserDrawButton");
    const browserWeatherButton = document.querySelector("#browserWeatherButton");

    browserWikipediaButton.addEventListener("click", openBrowserWikipedia);
    browserDrawButton.addEventListener("click", openBrowserDraw);
    browserWeatherButton.addEventListener("click", openBrowserWeather);

    if (browserURLBar) {
        browserURLBar.value = "";
    }
}

function openBrowserWikipedia() {
    browserWebContent.innerHTML = `<iframe class="browser_iframe" src="https://en.wikipedia.org/wiki/Meow" width="100%" height="100%"></iframe>`;
}

function openBrowserDraw() {
    browserWebContent.innerHTML = `<iframe class="browser_iframe" src="https://www.autodraw.com/" width="100%" height="100%"></iframe>`;
}

function openBrowserWeather() {
    browserWebContent.innerHTML = `<iframe class="browser_iframe" src="https://www.accuweather.com/" width="100%" height="100%"></iframe>`;
}

function loadBrowserURL(url) {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
    }
    browserWebContent.innerHTML = `<iframe class="browser_iframe" src="${url}" width="100%" height="100%"></iframe>`;

    if (browserURLBar) {
        browserURLBar.value = url;
    }

    const iFrame = browserWebContent.querySelector("iframe");

    let loaded = false
    iFrame.addEventListener("load", function () {
        loaded = true
    })

    setTimeout(function () {
        if (!loaded) {
            showSiteBlockedMessage();
        }
    }, 5000)
}

function showSiteBlockedMessage() {
    browserWebContent.innerHTML = `<div class="browser_blocked_message" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center;">
                                        <h1>This site can't be displayed here.</h1>
                                        <div class="browser_go_home_from_blocked_button clickable no_select" id="browserGoHomeFromBlocked">Go Home</div>
                                    </div>`;
    document.querySelector("#browserGoHomeFromBlocked").addEventListener("click", openBrowserHomePage);
}

browserURLBar.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const value = browserURLBar.value.trim();
        if (value === "") {
            openBrowserHomePage();
            return;
        }
        loadBrowserURL(browserURLBar.value);
    }
});

browserHomeButton.addEventListener("click", function () {
    openBrowserHomePage();
    browserHomeButton.classList.add("browser_homepage_selector_animation");
    setTimeout(function () {
        browserHomeButton.classList.remove("browser_homepage_selector_animation");
    }, 150);
});

openBrowserHomePage();