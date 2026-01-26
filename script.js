// List of songs
const songs = [
  { title: "Down on my Shoulder", artist: "Shadow", file: "Shadow-Music/Music/DownShoulder.mp3", cover: "Shadow-Music/Covers/IMG_0285.jpg" },
  { title: "Halloween with you", artist: "Shadow", file: "Shadow-Music/Music/Halloween.mp3", cover: "Shadow-Music/Covers/IMG_0849.jpg" },
  { title: "Under these Lights", artist: "Shadow", file: "Shadow-Music/Music/UnderLights.mp3", cover: "Shadow-Music/Covers/IMG_3358.jpg" },
];

let currentSong = 0;
let isPlaying = false;
let repeat = false;
let shuffle = false;

const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const muteBtn = document.getElementById("mute");
const repeatBtn = document.getElementById("repeat");
const shuffleBtn = document.getElementById("shuffle");

const playlistEl = document.getElementById("playlist");
const search = document.getElementById("search");

// Load song
function loadSong(index){
  const song = songs[index];
  audio.src = song.file;
  cover.src = song.cover;
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
  highlightPlaylist();
}

// Play / Pause
function playSong(){
  audio.play();
  playBtn.textContent = "⏸️";
  isPlaying = true;
  cover.classList.add("playing");
}
function pauseSong(){
  audio.pause();
  playBtn.textContent = "▶️";
  isPlaying = false;
  cover.classList.remove("playing");
}

// Next / Previous
function nextSong(){
  if(shuffle){
    currentSong = Math.floor(Math.random() * songs.length);
  } else {
    currentSong = (currentSong + 1) % songs.length;
  }
  loadSong(currentSong);
  playSong();
}
function prevSong(){
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  playSong();
}

// Update Progress
audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
});

// Seek
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Mute
muteBtn.addEventListener("click", () => {
  audio.muted = !audio.muted;
  muteBtn.textContent = audio.muted ? "🔇" : "🔊";
});

// Repeat / Shuffle
repeatBtn.addEventListener("click", () => {
  repeat = !repeat;
  repeatBtn.style.background = repeat ? "#00BFFF" : "#1E90FF";
});
shuffleBtn.addEventListener("click", () => {
  shuffle = !shuffle;
  shuffleBtn.style.background = shuffle ? "#00BFFF" : "#1E90FF";
});

// Song Ended
audio.addEventListener("ended", () => {
  if(repeat) playSong();
  else nextSong();
});

// Play/Pause button
playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

// Prev/Next buttons
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Cover tap to play/pause
cover.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

// Build Playlist
function buildPlaylist(filter=""){
  playlistEl.innerHTML = "";
  songs.forEach((song, index) => {
    if(song.title.toLowerCase().includes(filter) || song.artist.toLowerCase().includes(filter)){
      const li = document.createElement("li");
      li.textContent = `${song.title} - ${song.artist}`;
      li.addEventListener("click", () => {
        currentSong = index;
        loadSong(currentSong);
        playSong();
      });
      playlistEl.appendChild(li);
    }
  });
}

// Highlight current song
function highlightPlaylist(){
  Array.from(playlistEl.children).forEach((li, idx) => {
    li.style.background = idx === currentSong ? "#4682B4" : "transparent";
  });
}

// Search filter
search.addEventListener("input", () => {
  buildPlaylist(search.value.toLowerCase());
});

// Initial setup
loadSong(currentSong);
buildPlaylist();
