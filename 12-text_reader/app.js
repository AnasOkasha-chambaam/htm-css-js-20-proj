const modulBtn = document.getElementById("toggle-modul"),
  results = document.getElementById("results"),
  settingsModul = document.getElementById("settings"),
  closeSettBtn = document.getElementById("back"),
  currentVoiceBtn = document.querySelector(".current-voice"),
  voicesList = document.querySelector(".voices"),
  activeVoice = document.querySelector(".active-voice"),
  speakBtn = document.querySelector(".footer"),
  textArea = document.getElementById("to-talk");

function eventListenters() {
  modulBtn.addEventListener("click", (e) => {
    document.body.className = "show-set";
  });
  closeSettBtn.addEventListener("click", (e) => {
    document.body.classList.remove("show-set");
  });
  settingsModul.addEventListener("click", function (e) {
    if (e.target == this) {
      document.body.classList.remove("show-set");
    }
  });
  currentVoiceBtn.addEventListener("click", function (e) {
    this.classList.toggle("choose");
  });
  voicesList.addEventListener("click", (e) => {
    if (e.target.className === "voice")
      document.querySelector(".voice.active").classList.remove("active");
    e.target.classList.add("active");
    activeVoice.innerText = e.target.innerText;
  });
  speakBtn.addEventListener("click", (e) => {
    console.log(textArea.value);
  });
  results.addEventListener("click", (e) => {
    if (e.target.parentElement.classList.contains("item")) {
      console.log(e.target.parentElement.lastElementChild.innerText);
    }
  });
}

eventListenters();
