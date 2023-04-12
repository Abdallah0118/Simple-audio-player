const playBtn = document.querySelector("#mainPlayBtn");
const audio = document.querySelector("#audio");
const btnPrev = document.querySelector("#btnPrev");
const btnNext = document.querySelector("#btnNext");
const trackTitle = document.querySelector(".track-title");
const slider = document.querySelector(".slider");
const thumb = document.querySelector(".slider-thumb");
const progress = document.querySelector(".progress");
const time = document.querySelector(".time");
const fullTime = document.querySelector(".fulltime");
const volumeSlider = document.querySelector(".volume-slider .slider");
const volumeIcon = document.querySelector(".volume-icon");
const volumeProgress = document.querySelector(".volume-slider .progress");

// some variables

let trackPlaying = false;
let volumeMuted = false;
let trackId = 0;

const tracks = [
  "calmdown",
  "Local",
  "hakem ramadan",
  "benkabel had",
  "foreign one",
  "abo kalb yl3ab",
  "we abeny",
];

playBtn.addEventListener("click", playTrack);

// play track function

function playTrack() {
  if (trackPlaying === false) {
    audio.play();
    playBtn.innerHTML = `<span class="material-symbols-rounded"> pause </span>`;
    trackPlaying = true;
  } else {
    audio.pause();
    playBtn.innerHTML = `<span class="material-symbols-rounded"> play_arrow </span>`;
    trackPlaying = false;
  }
}
//  swich track

function switchTrack() {
  if (trackPlaying === true) {
    audio.play();
  }
}

// // get track source
const trackSrc = `./playlist/${tracks[trackId]}.mp3`;

// // load tracks

function loadTrack() {
  audio.src = `./playlist/${tracks[trackId]}.mp3`;
  audio.load();
  trackTitle.innerHTML = tracks[trackId];
  progress.style.width = 0;
  thumb.style.left = 0;

  audio.addEventListener("loadeddata", () => {
    setTime(fullTime, audio.duration);
    slider.setAttribute("max", audio.duration);
  });
}

loadTrack();

// previos btn

btnPrev.addEventListener("click", () => {
  trackId--;
  if (trackId < 0) {
    trackId = tracks.length - 1;
  }

  // load track
  loadTrack();
  // then switchTrack
  switchTrack();
});

// nextTrack function

function nextTrack() {
  trackId++;
  if (trackId > tracks.length - 1) {
    trackId = 0;
  }

  // load track
  loadTrack();
  // then switchTrack
  switchTrack();
}

// next btn
btnNext.addEventListener("click", nextTrack);
// when ended
audio.addEventListener("ended", nextTrack);

// for time

function setTime(output, input) {
  const minutes = Math.floor(input / 60);
  const secounds = Math.floor(input % 60);
  if (secounds < 10) {
    output.innerHTML = minutes + ":0" + secounds;
  } else {
    output.innerHTML = minutes + ":" + secounds;
  }
}
setTime(fullTime, audio.duration);

audio.addEventListener("timeupdate", () => {
  const currentAudioTime = Math.floor(audio.currentTime);
  const timePercentage = (currentAudioTime / audio.duration) * 100 + "%";
  setTime(time, currentAudioTime);
  progress.style.width = timePercentage;
  thumb.style.left = timePercentage;
});

// to handle slider values

function customSlider() {
  let val = (slider.value / audio.duration) * 100 + "%";
  progress.style.width = val;
  thumb.style.left = val;
  setTime(time, slider.value);
  audio.currentTime = slider.value;
}
customSlider();

slider.addEventListener("input", customSlider);

// finally the volume
function customVolumeSlider() {
  const maxVal = volumeSlider.getAttribute("max");
  val = (volumeSlider.value / maxVal) * 100 + "%";
  volumeProgress.style.width = val;
  audio.volume = volumeSlider.value / 100;
}
customVolumeSlider();

volumeSlider.addEventListener("input", customVolumeSlider);
