const darkModeButton = document.querySelector("#darkModeButton");
const lightModeButton = document.querySelector("#lightModeButton");

const catWidgetToggleButton = document.querySelector("#catWidgetToggle");
const calendarWidgetToggleButton = document.querySelector("#calendarWidgetToggle");
const clockWidgetToggleButton = document.querySelector("#clockWidgetToggle");

const factoryResetButton = document.querySelector("#factoryResetButton");

function settingsToggleWidget(widget) {
    const isHidden = widget.style.display === "none" || widget.style.display === "";
    if (isHidden) {
        widget.style.display = "flex";
    } else {
        widget.style.display = "none";
    }
    widget.style.left = "3vmin";
}

function checkWidgetVisibility() {
    if (localStorage.getItem("catWidgetVisible") === "false") {
        cat.style.display = "none";
    } else {
        cat.style.display = "flex";
    }
    if (localStorage.getItem("calendarWidgetVisible") === "false") {
        calendar.style.display = "none";
    } else {
        calendar.style.display = "flex";
    }
    if (localStorage.getItem("clockWidgetVisible") === "false") {
        clockWidget.style.display = "none";
    } else {
        clockWidget.style.display = "flex";
    }
}

darkModeButton.addEventListener("click", function() {
    switchToDarkMode();
    darkModeButton.classList.add("settings_button_clicking_animation");
    setTimeout(function() {
        darkModeButton.classList.remove("settings_button_clicking_animation");
    }, 150);
});

lightModeButton.addEventListener("click", function() {
    switchToLightMode();
    lightModeButton.classList.add("settings_button_clicking_animation");
    setTimeout(function() {
        lightModeButton.classList.remove("settings_button_clicking_animation");
    }, 150);
});

catWidgetToggleButton.addEventListener("click", function() {
    settingsToggleWidget(cat);
    localStorage.setItem("catWidgetVisible", cat.style.display === "flex" ? "true" : "false");
    cat.style.top = "8vmin";
    catWidgetToggleButton.classList.add("settings_button_clicking_animation");
    setTimeout(function() {
        catWidgetToggleButton.classList.remove("settings_button_clicking_animation");
    }, 150);
});

calendarWidgetToggleButton.addEventListener("click", function() {
    settingsToggleWidget(calendar);
    localStorage.setItem("calendarWidgetVisible", calendar.style.display === "flex" ? "true" : "false");
    calendar.style.top = "25vmin";
    calendarWidgetToggleButton.classList.add("settings_button_clicking_animation");
    setTimeout(function() {
        calendarWidgetToggleButton.classList.remove("settings_button_clicking_animation");
    }, 150);
});

clockWidgetToggleButton.addEventListener("click", function() {
    settingsToggleWidget(clockWidget);
    localStorage.setItem("clockWidgetVisible", clockWidget.style.display === "flex" ? "true" : "false");
    clockWidget.style.top = "51vmin";
    clockWidgetToggleButton.classList.add("settings_button_clicking_animation");
    setTimeout(function() {
        clockWidgetToggleButton.classList.remove("settings_button_clicking_animation");
    }, 150);
});

factoryResetButton.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

checkWidgetVisibility();