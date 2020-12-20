const video = document.getElementById("video"),
  play = document.getElementById("play"),
  stop = document.getElementById("stop"),
  progress = document.getElementById("progress"),
  timeStamp = document.getElementById("timestamp");

class Video {
  static toggleVidStatus(e) {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }
  static stopVid(e) {
    video.currentTime = 0;
    video.pause();
  }
  static updateVid(e) {
    video.currentTime = (progress.value * video.duration) / 100;
  }
}

class UI {
  static togglePlayBtn(e) {
    play.firstElementChild.classList.toggle("fa-play");
    play.firstElementChild.classList.toggle("fa-pause");
  }
  static updateProgress(e) {
    progress.value = (video.currentTime / video.duration) * 100;

    progress.style.background = `linear-gradient(to right, #8dce2b ${progress.value}%, gray 0%)`;

    let mins = Math.floor(video.currentTime / 60);
    if (mins < 10) {
      mins = "0" + mins;
    }

    let secs = Math.floor(video.currentTime % 60);
    if (secs < 10) {
      secs = "0" + secs;
    }
    timeStamp.innerHTML = `${mins}:${secs}`;
  }
}

video.addEventListener("click", Video.toggleVidStatus);
video.addEventListener("play", UI.togglePlayBtn);
video.addEventListener("pause", UI.togglePlayBtn);
video.addEventListener("timeupdate", UI.updateProgress);

play.addEventListener("click", Video.toggleVidStatus);

stop.addEventListener("click", Video.stopVid);

progress.addEventListener("change", Video.updateVid);
