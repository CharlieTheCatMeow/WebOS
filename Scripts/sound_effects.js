const click_sound = document.getElementById("clickSound");

document.addEventListener("click", (event) => {
    if (event.target.closest(".clickable")) {
        playSound(click_sound);
    }
});

function playSound(audioElement) {
    const audio_clone = audioElement.cloneNode();
    audio_clone.play();
}