:root{
  --bg1:#0b1026;
  --bg2:#140a2e;

  --blue:#1e90ff;
  --purple:#a855f7;
  --pink:#ff4fd8;

  --text:#eef6ff;
}

/* 🌌 Full screen that NEVER cuts off */
html,body{
  margin:0;
  height:100%;
  font-family:Arial, Helvetica, sans-serif;
  color:var(--text);

  background:
    radial-gradient(circle at 15% 20%, rgba(30,144,255,.25), transparent 40%),
    radial-gradient(circle at 85% 80%, rgba(255,79,216,.18), transparent 45%),
    linear-gradient(180deg,var(--bg1),var(--bg2));

  display:flex;
  justify-content:center;
  align-items:center;

  overflow:hidden;
}

/* wrapper prevents cutoff on tall/short devices */
.app-wrap{
  width:100%;
  height:100%;
  display:flex;
  justify-content:center;
  align-items:center;
  padding:clamp(10px,3vh,40px);
  box-sizing:border-box;
}

/* 💜 Main player */
.music-app{
  width:min(95vw,900px);
  max-height:100%;
  overflow:auto;

  background:linear-gradient(180deg,#101a3a,#0a0f24);
  border-radius:26px;
  padding:clamp(16px,3vw,28px);

  box-shadow:
    0 0 35px rgba(168,85,247,.45),
    0 0 90px rgba(255,79,216,.25),
    inset 0 0 30px rgba(30,144,255,.25);

  text-align:center;
}

/* Title */
.title{
  margin:0 0 12px;
  font-size:clamp(22px,4vw,34px);
  letter-spacing:2px;
  text-shadow:0 0 18px rgba(255,79,216,.6);
}

/* Cover */
.cover-wrap{
  display:flex;
  justify-content:center;
  margin-bottom:14px;
}

#cover{
  width:clamp(140px,38vw,260px);
  border-radius:18px;
  cursor:pointer;

  box-shadow:
    0 0 25px rgba(30,144,255,.6),
    0 0 60px rgba(168,85,247,.5);

  transition:.4s ease;
}

#cover.playing{
  animation:coverPulse 3s infinite alternate;
}

@keyframes coverPulse{
  from{box-shadow:0 0 30px rgba(30,144,255,.6);}
  to{box-shadow:0 0 85px rgba(255,79,216,1);}
}

/* Song meta */
.song-meta h2{
  margin:8px 0 4px;
  font-size:clamp(18px,3.5vw,24px);
}

.song-meta p{
  margin:0 0 12px;
  color:#b9c7ff;
  font-size:clamp(14px,3vw,16px);
}

/* Controls */
.controls{
  display:flex;
  justify-content:center;
  gap:10px;
  margin:10px 0;
  flex-wrap:wrap;
}

button{
  background:linear-gradient(145deg,#1a1f4f,#0c102b);
  border:1px solid var(--purple);
  color:white;
  padding:8px 14px;
  border-radius:12px;
  cursor:pointer;

  box-shadow:
    0 0 12px rgba(168,85,247,.6),
    inset 0 0 10px rgba(255,79,216,.25);

  transition:.25s;
}

button:hover{
  transform:scale(1.12);
  box-shadow:
    0 0 25px rgba(255,79,216,1),
    0 0 60px rgba(168,85,247,.7);
}

button.active{
  background:linear-gradient(145deg,var(--purple),var(--pink));
}

/* Sliders */
input[type="range"]{
  width:100%;
  appearance:none;
  height:10px;
  border-radius:999px;
  margin:8px 0;

  background:linear-gradient(90deg,var(--blue),var(--purple),var(--pink));
}

input[type="range"]::-webkit-slider-thumb{
  appearance:none;
  width:18px;
  height:18px;
  border-radius:50%;
  background:white;
  box-shadow:0 0 15px var(--pink);
  cursor:pointer;
}

/* Search */
#search{
  width:100%;
  padding:10px;
  border-radius:12px;
  border:1px solid var(--blue);
  background:#0e1433;
  color:white;
  margin:12px 0;
  text-align:center;
  box-shadow:0 0 12px rgba(30,144,255,.4);
}

/* Playlist */
#playlist{
  list-style:none;
  padding:0;
  margin:0;
  max-height:200px;
  overflow:auto;
}

#playlist li{
  padding:8px;
  border-radius:10px;
  cursor:pointer;
  transition:.2s;
}

#playlist li:hover{
  background:rgba(168,85,247,.15);
}

#playlist li.current{
  background:linear-gradient(90deg,var(--purple),var(--pink));
}

/* 📱 Responsive safety */
@media(max-height:700px){
  .music-app{
    padding:14px;
  }
  #playlist{
    max-height:140px;
  }
}