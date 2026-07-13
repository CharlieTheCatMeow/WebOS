const darkModeButton = document.querySelector("#darkModeButton");
const lightModeButton = document.querySelector("#lightModeButton");

const catWidgetToggleButton = document.querySelector("#catWidgetToggle");
const calendarWidgetToggleButton = document.querySelector("#calendarWidgetToggle");

const factoryResetButton = document.querySelector("#factoryResetButton");

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
    const isHidden = cat.style.display === "none" || cat.style.display === "";
    if (isHidden) {
        cat.style.display = "flex";
    } else {
        cat.style.display = "none";
    }
    catWidgetToggleButton.classList.add("settings_button_clicking_animation");
    setTimeout(function() {
        catWidgetToggleButton.classList.remove("settings_button_clicking_animation");
    }, 150);
});

calendarWidgetToggleButton.addEventListener("click", function() {
    const isHidden = calendar.style.display === "none" || calendar.style.display === "";
    if (isHidden) {
        calendar.style.display = "flex";
    } else {
        calendar.style.display = "none";
    }
    calendarWidgetToggleButton.classList.add("settings_button_clicking_animation");
    setTimeout(function() {
        calendarWidgetToggleButton.classList.remove("settings_button_clicking_animation");
    }, 150);
});

factoryResetButton.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});