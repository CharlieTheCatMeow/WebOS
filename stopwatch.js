const stopwatchTime = document.querySelector("#stopwatchTime");
const stopwatchResetButton = document.querySelector("#stopwatchResetButton");
const stopwatchStartStopButton = document.querySelector("#stopwatchStartStopButton");

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;

function updateStopwatchTime() {
    const timeNow = Date.now();
    elapsedTime = timeNow - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    stopwatchTime.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`
}

stopwatchStartStopButton.addEventListener("click", function () {
    if (!timerInterval) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateStopwatchTime, 10);
        stopwatchStartStopButton.innerHTML = `<i class="material-icons start_stop_icon no_select">pause</i>`;
    } else {
        clearInterval(timerInterval);
        timerInterval = null;
        stopwatchStartStopButton.innerHTML = `<i class="material-icons start_stop_icon no_select">play_arrow</i>`;
    }
    stopwatchStartStopButton.classList.add("select_button");
    setTimeout(function () {
        stopwatchStartStopButton.classList.remove("select_button");
    }, 150)
});

stopwatchResetButton.addEventListener("click", function () {
    clearInterval(timerInterval);
    timerInterval = null;
    startTime = 0;
    elapsedTime = 0;
    stopwatchTime.textContent = "00:00:00:00";
    stopwatchResetButton.classList.add("select_button");
    setTimeout(function () {
        stopwatchResetButton.classList.remove("select_button");
    }, 150)
});