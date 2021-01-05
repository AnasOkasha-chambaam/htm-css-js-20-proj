const money = document.getElementById("total-money"),
  ttlInc = document.getElementById("total-income"),
  ttlExp = document.getElementById("total-expense"),
  transHistory = document.getElementById("history"),
  form = document.getElementById("add-form"),
  nameInp = document.getElementById("name"),
  amountInp = document.getElementById("amount"),
  theSign = document.getElementById("the-sign");

class LS {
  static theLogs() {
    return JSON.parse(localStorage.getItem("Logs")) || [];
  }
  static saveLogs(logs) {
    localStorage.setItem("Logs", JSON.stringify(logs));
  }
}

class UI {
  static showLog(log) {
    const li = document.createElement("li");
    li.className = `money ${log.amount < 0 ? "minus" : "plus"}`;
    li.innerText = `${log.name}:   $${Math.abs(log.amount)}`;
    transHistory.appendChild(li);
  }
  static showIncExp() {
    ttlInc.innerText = `$${LS.theLogs().reduce((co, one) => {
      if (one.amount > 0) {
        return (co += one.amount);
      } else {
        return co;
      }
    }, 0)}`;
    ttlExp.innerText = `$${Math.abs(
      LS.theLogs().reduce((co, one) => {
        if (one.amount < 0) {
          return (co += one.amount);
        } else {
          return co;
        }
      }, 0)
    )}`;
    money.innerText = `${LS.theLogs().reduce((co, one) => {
      return (co += one.amount);
    }, 0)}$`;
  }
  static setTheApp() {
    LS.theLogs().forEach((one) => {
      UI.showLog(one);
    });
    UI.showIncExp();
  }
}

class ALog {
  constructor(name, amount) {
    this.id = LS.theLogs()[LS.theLogs().length - 1]
      ? LS.theLogs()[LS.theLogs().length - 1].id + 1
      : 0;
    this.name = name;
    this.amount = amount;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!nameInp.value.trim() || nameInp.value.length < 3) {
    return alert("Enter a vaild name, please.");
  } else if (!amountInp.value.trim() || +amountInp.value < 0) {
    return alert("Please, enter a positive value.");
  }
  let newLog = new ALog(
      nameInp.value.trim(),
      +amountInp.value.trim() * (theSign.checked ? -1 : +1)
    ),
    LSLogs = LS.theLogs();
  LSLogs.push(newLog);
  LS.saveLogs(LSLogs);
  UI.showLog(newLog);
  UI.showIncExp();
  nameInp.value = "";
  amountInp.value = "";
});

UI.setTheApp();
