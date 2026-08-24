const darkModeButton = document.querySelector("#darkModeButton");
const lightModeButton = document.querySelector("#lightModeButton");
const dayModeButton = document.querySelector("#dayModeButton");
const purpleModeButton = document.querySelector("#purpleModeButton");
const sunsetModeButton = document.querySelector("#sunsetModeButton");
const pinkModeButton = document.querySelector("#pinkModeButton");

const catWidgetToggleButton = document.querySelector("#catWidgetToggle");
const calendarWidgetToggleButton = document.querySelector("#calendarWidgetToggle");
const clockWidgetToggleButton = document.querySelector("#clockWidgetToggle");

const clickSoundToggleButton = document.querySelector("#clickSoundToggle");
const typeSoundToggleButton = document.querySelector("#typeSoundToggle");

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
    switchTheme("dark");
    darkModeButton.classList.add("settings_button_clicking_animation");
    setTimeout(function() {
        darkModeButton.classList.remove("settings_button_clicking_animation");
    }, 150);
});

lightModeButton.addEventListener("click", function() {
    switchTheme("light");
    lightModeButton.classList.add("settings_button_clicking_animation");
    setTimeout(function() {
        lightModeButton.classList.remove("settings_button_clicking_animation");
    }, 150);
});

dayModeButton.addEventListener("click", function() {
    switchTheme("day");
    dayModeButton.classList.add("settings_button_clicking_animation");
    setTimeout(function() {
        dayModeButton.classList.remove("settings_button_clicking_animation");
    }, 150);
});

purpleModeButton.addEventListener("click", function() {
    switchTheme("purple");
    purpleModeButton.classList.add("settings_button_clicking_animation");
    setTimeout(function() {
        purpleModeButton.classList.remove("settings_button_clicking_animation");
    }, 150);
});

sunsetModeButton.addEventListener("click", function() {
    switchTheme("sunset");
    sunsetModeButton.classList.add("settings_button_clicking_animation");
    setTimeout(function() {
        sunsetModeButton.classList.remove("settings_button_clicking_animation");
    }, 150);
});

pinkModeButton.addEventListener("click", function() {
    switchTheme("pink");
    pinkModeButton.classList.add("settings_button_clicking_animation");
    setTimeout(function() {
        pinkModeButton.classList.remove("settings_button_clicking_animation");
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

clickSoundToggleButton.addEventListener("click", function() {
    toggleClickSound()
    clickSoundToggleButton.classList.add("settings_button_clicking_animation");
    setTimeout(function() {
        clickSoundToggleButton.classList.remove("settings_button_clicking_animation");
    }, 150);
});

typeSoundToggleButton.addEventListener("click", function() {
    toggleTypeSound()
    typeSoundToggleButton.classList.add("settings_button_clicking_animation");
    setTimeout(function() {
        typeSoundToggleButton.classList.remove("settings_button_clicking_animation");
    }, 150);
});

factoryResetButton.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

checkWidgetVisibility();