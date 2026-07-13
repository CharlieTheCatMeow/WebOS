const catWidgetImage = document.querySelector('#catImageContainer');
const catMeowAudio = document.querySelector('#catMeowSound');

catWidgetImage.addEventListener('click', function () {
    catMeowAudio.currentTime = 0;
    catMeowAudio.play();
    catWidgetImage.classList.add("cat_pressed");
    setTimeout(function () {
        catWidgetImage.classList.remove("cat_pressed");
    }, 100);
});