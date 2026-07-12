const musicPlayerImage = document.querySelector("#musicPlayerImage");
const musicPlayerTitle = document.querySelector("#musicPlayerSongTitle");
const musicPlayerProgress = document.querySelector("#musicPlayerProgress");
const musicPlayerBackButton = document.querySelector("#musicPlayerPreviousButton");
const musicPlayerPlayPauseButton = document.querySelector("#musicPlayerPlayPauseButton");
const musicPlayerNextButton = document.querySelector("#musicPlayerNextButton");
const musicPlayerPlaylist = document.querySelector("#musicPlayerPlaylist");

const playlist = [
    {title: "Bloody Stream", audioSrc: "Audio/Bloody_Stream.mp3", imgSrc: "Images/Bloody_Stream.jpg"},
    {title: "Canzoni Preferite", audioSrc: "Audio/Canzoni_Preferite.mp3", imgSrc: "Images/Canzoni_Preferite.jpg"},
    {title: "Hungarian Dance no.5", audioSrc: "Audio/Hungarian_Dance.mp3", imgSrc: "Images/Hungarian_Dance.jpg"}
]

let currentSongIndex = null;
let currentAudio = null;

function loadSongs() {
    playlist.forEach((song, index) => {
        const songElement = document.createElement("div");
        songElement.classList.add("song_element");
        songElement.classList.add("hide_scrollbar");
        songElement.innerHTML = `
            <div class="song_info">
                <div class="song_image">
                    <img class="song_image_src" src="${song.imgSrc}" alt="No image found">
                </div>
                <div class="song hide_scrollbar" data-index="${index}">${song.title}</div>
            </div>
            <div class="song_play">
                <div id="songPlayButton${index}" class="song_play_button">
                    <i class="material-icons song_play_button_icon no_select">play_arrow</i>
                </div>
            </div>
        `;
        const songPlayButton = songElement.querySelector(`#songPlayButton${index}`);
        songPlayButton.addEventListener("click", function () {
            playSong(index);
            musicPlayerPlayPauseButton.innerHTML = `<i class="material-icons music_player_play_pause_button_icon no_select">pause</i>`;
            songPlayButton.classList.add("music_player_button_press");
            setTimeout(function () {
                songPlayButton.classList.remove("music_player_button_press");
            }, 150);
        });
        musicPlayerPlaylist.appendChild(songElement);
    });
}

function playSong(index) {
    const song = playlist[index];
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    currentSongIndex = index;
    currentAudio = new Audio(song.audioSrc);
    applyGlobalVolume(currentAudio);
    currentAudio.play();
    musicPlayerImage.src = song.imgSrc;
    if (musicPlayerImage.classList.contains("music_player_no_image")) {
        musicPlayerImage.classList.remove("music_player_no_image");
    }
    musicPlayerTitle.innerText = song.title;
}

function PlayPauseSong() {
    if (!currentAudio) return;
    if (currentAudio.paused) {
        currentAudio.play();
        musicPlayerPlayPauseButton.innerHTML = `<i class="material-icons music_player_play_pause_button_icon no_select">pause</i>`;
    } else {
        currentAudio.pause();
        musicPlayerPlayPauseButton.innerHTML = `<i class="material-icons music_player_play_pause_button_icon no_select">play_arrow</i>`;
    }
}

function nextSong() {
    if (currentSongIndex === null) return;
    const nextIndex = (currentSongIndex + 1) % playlist.length;
    playSong(nextIndex);
}

function previousSong() {
    if (currentSongIndex === null) return;
    const previousIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    playSong(previousIndex);
}

function updateProgressBar() {
    if (!currentAudio) return;
    const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
    musicPlayerProgress.style.width = `${progress}%`;
}

setInterval(updateProgressBar, 500);

musicPlayerBackButton.addEventListener("click", function () {
    previousSong();
    musicPlayerBackButton.classList.add("music_player_button_press");
    setTimeout(function () {
        musicPlayerBackButton.classList.remove("music_player_button_press");
    }, 150);
});

musicPlayerPlayPauseButton.addEventListener("click", function () {
    PlayPauseSong();
    musicPlayerPlayPauseButton.classList.add("music_player_button_press");
    setTimeout(function () {
        musicPlayerPlayPauseButton.classList.remove("music_player_button_press");
    }, 150);
});
musicPlayerNextButton.addEventListener("click", function () {
    nextSong();
    musicPlayerNextButton.classList.add("music_player_button_press");
    setTimeout(function () {
        musicPlayerNextButton.classList.remove("music_player_button_press");
    }, 150);
});

loadSongs();