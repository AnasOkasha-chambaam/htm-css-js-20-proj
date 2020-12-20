const addUser = document.getElementById("add-user"),
  doubleMoney = document.getElementById("double"),
  showMills = document.getElementById("show-millionaires"),
  sortList = document.getElementById("sort"),
  calcWealth = document.getElementById("calculate-wealth"),
  resList = document.getElementById("people-list"),
  ttlSpan = document.getElementById("total-span"),
  clearAll = document.getElementById("clear");

// let people = [{ id: 1, name: "any", money: 2654900 },{ id: 2, name: "any any", money: 65495 },{ id: 3, name: "any any any", money: 26546 },];
let people = [];

class aPerson {
  constructor(name, money) {
    this.id = people[people.length - 1] ? people[people.length - 1].id + 1 : 0;
    this.name = name;
    this.money = money;
  }
  static async fetchPerson() {
    ttlSpan.innerHTML = "";
    let resp = await fetch("https://randomuser.me/api"),
      data = await resp.json(),
      oneUser = data.results[0],
      oneUserName = oneUser.name.first + oneUser.name.last,
      oneUserMoney = Math.random() * 1100000;
    oneUser = new aPerson(oneUserName, oneUserMoney);
    people.push(oneUser);
    UI.addPerson(oneUser);
  }
  static doubleTheMoney() {
    ttlSpan.innerHTML = "";
    people = people.map((one) => {
      return { ...one, money: one.money * 2 };
    });
    console.log(people);
    UI.showPeople();
  }
}

class UI {
  static showPeople() {
    resList.innerHTML = ``;
    people.forEach((one) => {
      UI.addPerson(one);
    });
  }
  static formatMoney(number) {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }
  static addPerson(one) {
    let li = document.createElement("li"),
      nameSpan = document.createElement("strong"),
      moneySpan = document.createElement("span");

    li.className = "item spread";
    li.id = `item-${one.id}`;
    moneySpan.id = "person-wealth";
    nameSpan.innerText = one.name;
    moneySpan.innerText = `$${UI.formatMoney(one.money)}`;
    li.appendChild(nameSpan);
    //   console.log(li);
    li.appendChild(moneySpan);
    resList.appendChild(li);
    //   console.log("aa");
  }
  static showMillsOnly() {
    ttlSpan.innerHTML = "";
    people = people.filter((one) => one.money > 1000000);
    UI.showPeople();
  }
  static sortByRichest() {
    ttlSpan.innerHTML = "";
    people = people.sort((a, b) => b.money - a.money);
    UI.showPeople();
  }
  static calcEntireWealth() {
    let entireWealth = people.reduce((acc, one) => (acc += one.money), 0);
    ttlSpan.innerHTML = `<h3 class="spread my-footer">
    <strong>Total Wealth:</strong
    ><span id="person-wealth">$${UI.formatMoney(entireWealth)}</span>
  </h3>`;
  }
  static clearList() {
    ttlSpan.innerHTML = "";
    people = [];
    UI.showPeople();
  }
}
UI.sortByRichest();
addUser.addEventListener("click", aPerson.fetchPerson);
doubleMoney.addEventListener("click", aPerson.doubleTheMoney);
showMills.addEventListener("click", UI.showMillsOnly);
sortList.addEventListener("click", UI.sortByRichest);
calcWealth.addEventListener("click", UI.calcEntireWealth);
clearAll.addEventListener("click", UI.clearList);

aPerson.fetchPerson();
aPerson.fetchPerson();
aPerson.fetchPerson();
