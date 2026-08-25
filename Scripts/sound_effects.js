const click_sound = document.getElementById("clickSound");
const type_sound = document.getElementById("typeSound");

let clickSoundEnabled = localStorage.getItem("clickSoundEnabled") === null ? true : localStorage.getItem("clickSoundEnabled") === "true";
let typeSoundEnabled = localStorage.getItem("typeSoundEnabled") === null ? true : localStorage.getItem("typeSoundEnabled") === "true";

if (clickSoundEnabled) {
    clickSoundToggleButton.classList.add("settings_toggle_enabled")
} else {
    clickSoundToggleButton.classList.remove("settings_toggle_enabled")
}

if (typeSoundEnabled) {
    typeSoundToggleButton.classList.add("settings_toggle_enabled")
} else {
    typeSoundToggleButton.classList.remove("settings_toggle_enabled")
}

function toggleClickSound() {
    clickSoundEnabled = !clickSoundEnabled;
    localStorage.setItem("clickSoundEnabled", clickSoundEnabled);
    if (clickSoundEnabled) {
        clickSoundToggleButton.classList.add("settings_toggle_enabled")
    } else {
        clickSoundToggleButton.classList.remove("settings_toggle_enabled")
    }
}

function toggleTypeSound() {
    typeSoundEnabled = !typeSoundEnabled;
    localStorage.setItem("typeSoundEnabled", typeSoundEnabled);
    if (typeSoundEnabled) {
        typeSoundToggleButton.classList.add("settings_toggle_enabled")
    } else {
        typeSoundToggleButton.classList.remove("settings_toggle_enabled")
    }
}

document.addEventListener("keydown", (event) => {
    const target = event.target;
    const isTextInput = target.matches("input[type='text'], input:not([type]), textarea");
    const isContentEditable = target.isContentEditable;

    if (isTextInput || isContentEditable) {
        if (!typeSoundEnabled) return;
        playSound(type_sound);
    }
});

document.addEventListener("click", (event) => {
    if (!clickSoundEnabled) return;
    if (event.target.closest(".clickable")) {
        playSound(click_sound);
    }
});

function playSound(audioElement) {
    const audio_clone = audioElement.cloneNode();
    audio_clone.play();
}