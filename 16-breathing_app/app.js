const TimeSetterForm = document.getElementById("time-setter"),
  inT = document.getElementById("in-t"),
  holdT = document.getElementById("hold-t"),
  outT = document.getElementById("out-t"),
  startBtn = document.getElementById("start");

const setDurations = (inTime, holdTime, outTime) => {
  inTime = +inTime;
  holdTime = +holdTime;
  outTime = +outTime;
  const totalTime = inTime + holdTime + outTime;
  circle.animate(
    [
      {
        transform: "rotate(0deg)",
        offset: 0,
      },
      {
        transform: "rotate(360deg)",
        offset: (inTime + holdTime + outTime) / totalTime,
      },
    ],
    {
      duration: totalTime * 1000,
      iterations: Infinity,
    }
  );
  app.animate(
    [
      {
        transform: "scale(1)",
        offset: 0,
      },
      {
        transform: "scale(1.1)",
        offset: inTime / totalTime,
      },
      {
        transform: "scale(1.1)",
        offset: (holdTime + inTime) / totalTime,
      },
      {
        transform: "scale(1)",
        offset: (inTime + holdTime + outTime) / totalTime,
      },
    ],
    {
      duration: totalTime * 1000,
      iterations: Infinity,
    }
  );

  gradient_circle.style.background = `conic-gradient(
    #f6bd60 0%,
    #f6bd60 ${(inTime / totalTime) * 100}%,
    #cb997e ${(inTime / totalTime) * 100}%,
    #cb997e ${((inTime + holdTime) / totalTime) * 100}%,
    #f7ede2 ${((inTime + holdTime) / totalTime) * 100}%,
    #f7ede2 100%,
    #f6bd60 100%
  )`;
};

startBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (this.parentElement.classList.toggle("active")) {
    this.innerText = "Start";
    inT.focus();
    return this.setAttribute("type", "submit");
  }
  this.innerText = "Set Time";
  this.setAttribute("type", "button");
  setDurations(inT.value, holdT.value, outT.value);
});
