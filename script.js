const songs = [
 { title:"Down on my Shoulder",artist:"ShadowNRust",file:"Music/DownShoulder.mp3",cover:"Covers/IMG_3358.jpg"},
 { title:"Halloween with you",artist:"ShadowNRust",file:"Music/Halloween.mp3",cover:"Covers/IMG_0285.jpg"},
 { title:"Under these Lights",artist:"ShadowNRust",file:"Music/UnderLights.mp3",cover:"Covers/IMG_0849.jpg"},
 { title:"Hollow Tree Heart",artist:"ShadowNRust",file:"Music/Hollow Tree Heart.mp3",cover:"Covers/IMG_3358.jpg"},
 { title:"Dream in Pastel",artist:"ShadowNRust",file:"Music/Dream in Pastel_1.mp3",cover:"Covers/IMG_3358.jpg"},
 { title:"Little Lights",artist:"ShadowNRust",file:"Music/Little Lights.mp3",cover:"Covers/IMG_3358.jpg"},
 { title:"Moon Milk",artist:"ShadowNRust",file:"Music/Moon Milk.mp3",cover:"Covers/IMG_3358.jpg"},
 { title:"Mossy Thoughts",artist:"ShadowNRust",file:"Music/Mossy Thoughts_1.mp3",cover:"Covers/IMG_3358.jpg"},
 { title:"Pebbles in My Pocket",artist:"ShadowNRust",file:"Music/Pebbles in My Pocket.mp3",cover:"Covers/IMG_3358.jpg"},
 { title:"Quiet Like the Rain",artist:"ShadowNRust",file:"Music/Quiet Like the Rain.mp3",cover:"Covers/IMG_3358.jpg"},
 { title:"Snail Trails",artist:"ShadowNRust",file:"Music/Snail Trails.mp3",cover:"Covers/IMG_3358.jpg"},
 { title:"Stars in the Sink",artist:"ShadowNRust",file:"Music/Stars in the Sink.mp3",cover:"Covers/IMG_3358.jpg"},
 { title:"Velvet Mornings",artist:"ShadowNRust",file:"Music/Velvet Mornings.mp3",cover:"Covers/IMG_3358.jpg"}
];

let currentSong = 0;
let isPlaying = false;
let repeat = false;
let shuffle = false;
let oneTime = false;
let queue = [];

const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const playlistEl = document.getElementById("playlist");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const muteBtn = document.getElementById("mute");
const repeatBtn = document.getElementById("repeat");
const shuffleBtn = document.getElementById("shuffle");
const queueBtn = document.getElementById("queue");
const search = document.getElementById("search");

function loadSong(i){
 const s = songs[i];
 audio.src = s.file;
 cover.src = s.cover;
 songTitle.textContent = s.title;
 songArtist.textContent = s.artist;
 highlightPlaylist();
}

function playSong(){
 audio.play();
 isPlaying = true;
 playBtn.textContent = "⏸";
 cover.classList.add("playing");
}

function pauseSong(){
 audio.pause();
 isPlaying = false;
 playBtn.textContent = "▶";
 cover.classList.remove("playing");
}

function nextSong(){

 if(oneTime){
   queue.shift();
   if(queue.length === 0){
     pauseSong();
     return;
   }
   currentSong = queue[0];
 }

 else if(shuffle){
   let next;
   do{
     next = Math.floor(Math.random()*songs.length);
   } while(next === currentSong);
   currentSong = next;
 }

 else{
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

audio.addEventListener("ended",()=>{
 if(repeat) playSong();
 else nextSong();
});

audio.addEventListener("timeupdate",()=>{
 progress.value = (audio.currentTime/audio.duration)*100 || 0;
});

progress.oninput = ()=> audio.currentTime = (progress.value/100)*audio.duration;
volume.oninput = ()=> audio.volume = volume.value;

muteBtn.onclick = ()=>{
 audio.muted = !audio.muted;
 muteBtn.textContent = audio.muted ? "🔇" : "🔊";
};

repeatBtn.onclick = ()=>{
 repeat = !repeat;
 repeatBtn.classList.toggle("active", repeat);
};

shuffleBtn.onclick = ()=>{
 shuffle = !shuffle;
 shuffleBtn.classList.toggle("active", shuffle);
};

queueBtn.onclick = ()=>{
 oneTime = !oneTime;
 queueBtn.classList.toggle("active", oneTime);

 if(oneTime){
   queue = [...Array(songs.length).keys()];
   if(shuffle) queue.sort(()=>Math.random()-0.5);
 }
};

playBtn.onclick = ()=> isPlaying ? pauseSong() : playSong();
prevBtn.onclick = prevSong;
nextBtn.onclick = nextSong;
cover.onclick = ()=> isPlaying ? pauseSong() : playSong();

function buildPlaylist(filter=""){
 playlistEl.innerHTML="";
 songs.forEach((s,i)=>{
   if(s.title.toLowerCase().includes(filter)){
     const li=document.createElement("li");
     li.textContent=`${s.title} - ${s.artist}`;
     li.onclick=()=>{
       currentSong=i;
       loadSong(i);
       playSong();
     }
     playlistEl.appendChild(li);
   }
 });
}

function highlightPlaylist(){
 [...playlistEl.children].forEach((li,i)=>{
   li.classList.toggle("current", i===currentSong);
 });
}

search.oninput = ()=> buildPlaylist(search.value.toLowerCase());

loadSong(0);
buildPlaylist();