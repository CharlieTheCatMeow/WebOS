const click_sound = document.getElementById("clickSound");
const type_sound = document.getElementById("typeSound");

document.addEventListener("keydown", (event) => {
    const target = event.target;
    const isTextInput = target.matches("input[type='text'], input:not([type]), textarea");
    const isContentEditable = target.isContentEditable;

    if (isTextInput || isContentEditable) {
        playSound(type_sound);
    }
});

document.addEventListener("click", (event) => {
    if (event.target.closest(".clickable")) {
        playSound(click_sound);
    }
});

function playSound(audioElement) {
    const audio_clone = audioElement.cloneNode();
    audio_clone.play();
}