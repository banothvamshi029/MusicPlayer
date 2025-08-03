Music.js
const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');
const current = document.getElementById('current');
const durationEl = document.getElementById('duration');

const songs = [{
        title: "Sample Song 1",
        artist: "Artist A",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        title: "Sample Song 2",
        artist: "Artist B",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    }
];

let songIndex = 0;

function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
}

function togglePlay() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
}

function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
}

audio.addEventListener('timeupdate', () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.value = percent || 0;

    // Time display
    current.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
});

progress.addEventListener('input', () => {
    audio.currentTime = (progress.value * audio.duration) / 100;
});

volume.addEventListener('input', () => {
    audio.volume = volume.value;
});

function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

// Load first song
loadSong(songs[songIndex]);