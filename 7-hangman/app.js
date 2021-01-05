console.log("Hello, sweety");
const bodyParts = document.querySelectorAll(".man-part"),
  popup = document.getElementById("popup"),
  usedMes = document.getElementById("used-mes"),
  theWord = document.getElementById("the-word"),
  wrongL = document.getElementById("wrong-letters"),
  wrngL = document.getElementById("wrong-letter"),
  playBtn = document.getElementById("play-again");
let won = false,
  fail = false,
  livesCounter = 0;

let appWords = ["any", "another", "an", "application", "wrong", "right"],
  correctLs = ["a", "p"],
  wrongLs = [],
  RWord;

class UI {
  static pickAWord() {
    popup.className = "popup";
    livesCounter = 0;
    UI.showManParts();
    wrongL.classList.remove("shown");
    won = false;
    fail = false;
    RWord = appWords[Math.floor(Math.random() * appWords.length)];
    correctLs = [];
    wrongLs = [];
    RWord.split("").forEach((one) => {
      if (Math.ceil(Math.random() * 100) < 40) {
        correctLs.push(one);
      }
    });
  }
  static setTheWord() {
    theWord.innerHTML = `
    ${RWord.split("")
      .map((one) => {
        return `<span class="letter"><span>${
          correctLs.includes(one) ? one : ""
        }</span></span>`;
      })
      .join("")}
    `;
    UI.showManParts();
    UI.checkFail();
    UI.checkWinnig();

    // if(){} //to check the winning state
  }
  static showUsedMes() {
    const li = document.createElement("li");
    li.className = "used-char";
    li.innerText = "This letter is already used!";
    usedMes.appendChild(li);
  }
  static checkWinnig() {
    let win = 0;
    for (let i = 0; i < RWord.split("").length; i++) {
      if (correctLs.includes(RWord.split("")[i])) {
        win++;
        console.log(win == RWord.length);
      }
    }
    if (win == RWord.length) {
      won = true;
      popup.firstElementChild.firstElementChild.innerText =
        "Congratulations! You WON!";
      popup.classList.add("are-active");
    }
  }
  static checkFail() {
    if (wrongLs.length > 0) {
      wrongL.classList.add("shown");
      wrngL.innerText = `
      ${wrongLs.join("\n")}
      `;
    } else {
      wrongL.classList.remove("shown");
    }
    if (livesCounter == 6) {
      fail = true;
      popup.firstElementChild.firstElementChild.innerText =
        "Unfortunately, You lost!";
      popup.classList.add("are-active-w");
    }
  }
  static showManParts() {
    bodyParts.forEach((one, ind, arr) => {
      if (ind < livesCounter) {
        one.classList.add("shown");
      } else {
        one.classList.remove("shown");
      }
    });
  }
}

UI.pickAWord();
UI.setTheWord();

bodyParts.forEach((one) => {
  one.style.strokeDasharray = `${one.getTotalLength()}`;
  one.style.strokeDashoffset = `${one.getTotalLength()}`;
});

document.body.addEventListener("keydown", (e) => {
  // bodyParts.forEach((one) => {
  //   one.classList.toggle("shown");
  // });
  // // popup.classList.toggle("are-active");
  // UI.showUsedMes();
  if ((won || fail) && e.key === "Enter") {
    UI.pickAWord();
    UI.setTheWord();
  }

  if (!won && !fail) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      console.log("You are lovely.");
      if (!correctLs.includes(e.key) && !wrongLs.includes(e.key)) {
        if (RWord.includes(e.key)) {
          correctLs.push(e.key);
          livesCounter--;
          UI.setTheWord();
          if (livesCounter < 0) {
            livesCounter = 0;
          }
        } else {
          wrongLs.push(e.key);
          livesCounter++;
          UI.setTheWord();
        }
      } else {
        UI.showUsedMes();
      }
    }
  }
});

playBtn.addEventListener("click", (e) => {
  UI.pickAWord();
  UI.setTheWord();
});
