const browserWebContent = document.querySelector("#browserWebContent");
const browserHomeButton = document.querySelector("#browserHomeButton");

function openBrowserHomePage() {
    browserWebContent.innerHTML = `<div id="browserWikipediaButton" class="browser_homepage_selector">
                                        <img class="browser_homepage_icon" src="Images/wikipedia.svg" alt="Wikipedia">
                                    </div>
                                    <div id="browserDrawButton" class="browser_homepage_selector">
                                        <img class="browser_homepage_icon" src="Images/draw.svg" alt="Draw">
                                    </div>
                                    <div id="browserWeatherButton" class="browser_homepage_selector">
                                        <img class="browser_homepage_icon" src="Images/weather.svg" alt="Weather">
                                    </div>`;
    const browserWikipediaButton = document.querySelector("#browserWikipediaButton");
    const browserDrawButton = document.querySelector("#browserDrawButton");
    const browserWeatherButton = document.querySelector("#browserWeatherButton");

    browserWikipediaButton.addEventListener("click", openBrowserWikipedia);
    browserDrawButton.addEventListener("click", openBrowserDraw);
    browserWeatherButton.addEventListener("click", openBrowserWeather);
}

function openBrowserWikipedia() {
    browserWebContent.innerHTML = `<iframe src="https://en.wikipedia.org/wiki/Meow" width="100%" height="100%"></iframe>`;
}

function openBrowserDraw() {
    browserWebContent.innerHTML = `<iframe src="https://www.autodraw.com/" width="100%" height="100%"></iframe>`;
}

function openBrowserWeather() {
    browserWebContent.innerHTML = `<iframe src="https://www.accuweather.com/" width="100%" height="100%"></iframe>`;
}

browserHomeButton.addEventListener("click", function () {
    openBrowserHomePage();
    browserHomeButton.classList.add("browser_homepage_selector_animation");
    setTimeout(function () {
        browserHomeButton.classList.remove("browser_homepage_selector_animation");
    }, 150);
});

openBrowserHomePage();