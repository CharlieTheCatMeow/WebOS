const darkModeButton = document.querySelector("#darkModeButton");
const lightModeButton = document.querySelector("#lightModeButton");

darkModeButton.addEventListener("click", function() {
    switchToDarkMode();
    darkModeButton.classList.add("switch_dark_light_mode_button_clicking_animation");
    setTimeout(function() {
        darkModeButton.classList.remove("switch_dark_light_mode_button_clicking_animation");
    }, 150);
});

lightModeButton.addEventListener("click", function() {
    switchToLightMode();
    lightModeButton.classList.add("switch_dark_light_mode_button_clicking_animation");
    setTimeout(function() {
        lightModeButton.classList.remove("switch_dark_light_mode_button_clicking_animation");
    }, 150);
});