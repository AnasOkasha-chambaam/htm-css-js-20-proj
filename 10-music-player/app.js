const progressBar = document.getElementById("prog-bar"),
  musicImg = document.getElementById("music-img"),
  theAudio = document.getElementById("the-audio"),
  controlers = document.getElementById("controlers"),
  audioName = document.getElementById("audio-name");
let audioNames = ["hey", "summer", "ukulele"],
  curr = 0;

class TheAudio {
  static setSong() {
    audioName.innerText = audioNames[curr];
    theAudio.src = `./music/${audioNames[curr]}.mp3`;
    musicImg.src = `./images/${audioNames[curr]}.jpg`;
  }
  static play() {
    document.body.classList.add("played");
    theAudio.volume = 0.4;
    theAudio.play();
  }
  static pause() {
    document.body.classList.remove("played");
    theAudio.pause();
  }
  static next() {
    curr++;
    if (curr > audioNames.length - 1) {
      curr = curr - audioNames.length;
    }
    TheAudio.setSong();
    TheAudio.play();
  }
  static prev() {
    curr--;
    if (curr < 0) {
      curr = curr + audioNames.length;
    }
    TheAudio.setSong();
    TheAudio.play();
  }
}

controlers.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-play-circle")) {
    TheAudio.play();
  }
  if (e.target.classList.contains("fa-pause-circle")) {
    TheAudio.pause();
  }
  if (e.target.classList.contains("fa-forward")) {
    TheAudio.next();
  }
  if (e.target.classList.contains("fa-backward")) {
    TheAudio.prev();
  }
});

theAudio.addEventListener("timeupdate", (e) => {
  progressBar.firstElementChild.style.left = `${
    (theAudio.currentTime / theAudio.duration) * 100
  }%`;
  progressBar.firstElementChild.style.boxShadow = `-119px 0 0px 114px rgb(255,${
    255 - (theAudio.currentTime / theAudio.duration) * 255
  },${255 - (theAudio.currentTime / theAudio.duration) * 255})`;
  musicImg.style.transform = `rotateZ(${
    (theAudio.currentTime / theAudio.duration) * 8100
  }deg)`;
  if (theAudio.currentTime / theAudio.duration == 1) {
    TheAudio.next();
  }
});

progressBar.addEventListener("click", (e) => {
  theAudio.currentTime =
    (e.offsetX / progressBar.offsetWidth) * theAudio.duration;
  console.log(e.offsetX / progressBar.offsetWidth);
});

TheAudio.setSong();
