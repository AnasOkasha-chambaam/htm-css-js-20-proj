const categList = document.getElementById("categ-list"),
  addingCategForm = document.getElementById("adding-categ"),
  newCategName = document.getElementById("new-categ-name"),
  categCancelBtn = document.getElementById("cancel-adding-categ"),
  addNewCategBtn = document.getElementById("add-new-categ"),
  addCardBtns = document.querySelectorAll("#add-card"),
  categCards = document.getElementById("categ-cards"),
  deleteAllCards = document.getElementById("delete-all-cards"),
  addingCardModule = document.getElementById("adding-card-module"),
  addingCardForm = document.getElementById("adding-card-form"),
  addingCardFace = document.getElementById("adding-card-face"),
  addingCardBack = document.getElementById("adding-card-back"),
  cardsList = document.getElementById("cards-list"),
  nextCard = document.getElementById("forward"),
  prevCard = document.getElementById("back"),
  backwardForward = document.querySelector(".back-forward"),
  categName = document.getElementById("categ-name");

/* 
structure of data saved in the local storage is:
{
id: {
  prop: value
}
}
*/

class LS {
  static saveToLS(name, value) {
    localStorage.setItem(`${name}`, JSON.stringify(value));
  }
  static retriveFromLS(name) {
    return JSON.parse(localStorage.getItem(`${name}`));
  }
  // static addToLS(item) {}
  static deleteFromLS(name, id) {
    const data = LS.retriveFromLS(name);
    delete data[id];
    LS.saveToLS(name, data);
  }
  static editInLS(name, id, prop, value) {
    const data = LS.retriveFromLS(name);
    data[id][prop] = value;
    LS.saveToLS(name, data);
  }
}

let cards = LS.retriveFromLS("cards") || {},
  categories = LS.retriveFromLS("categs") || {};

class Card {
  constructor(categId, quez, ans) {
    if (!categories[categId])
      return console.log(`There is no categorie with this id '${categId}'`);
    let cardsKeysArr = Object.keys(cards),
      lastCardSequence = cardsKeysArr[cardsKeysArr.length - 1]
        ? +cardsKeysArr[cardsKeysArr.length - 1].split("_S_")[1] + 1
        : 0;
    this.cardSequence = String(lastCardSequence).padStart(3, "0");
    this.id = `${categId}_S_${this.cardSequence}`;
    this.quez = quez;
    this.ans = ans;
    this.categId = categId;
    this.addIt();
    LS.saveToLS("cards", cards);
    LS.saveToLS("categs", categories);
  }
  addIt() {
    let { categId, id, cardSequence, quez, ans } = this;
    cards[id] = { categId, id, cardSequence, quez, ans };
    categories[categId].NoOfCards++;
    categories[categId].relatedCardsIds.push(id);
  }
}
class Categ {
  constructor(name) {
    let categsKeysArr = Object.keys(categories),
      lastCategSequence = categsKeysArr[categsKeysArr.length - 1]
        ? categories[categsKeysArr[categsKeysArr.length - 1]].categSequence + 1
        : 0;
    this.name = name;
    this.id = `${this.name}`;
    if (categories[name]) return alert(`The categorie ${name} already exits`);
    this.categSequence = lastCategSequence;
    this.NoOfCards = 0;
    this.relatedCardsIds = [];
    this.addIt();
    LS.saveToLS("categs", categories);
  }
  addIt() {
    let { categSequence, name, id, NoOfCards, relatedCardsIds } = this;
    categories[id] = { id, categSequence, name, NoOfCards, relatedCardsIds };
  }
}
class UI {
  static checkInput(input) {
    if (input.value.trim().length > 2) {
      return true;
    }
  }
  static addCateg(categ) {
    let newCateg = document.createElement("li");
    newCateg.setAttribute("data-categ-name", categ.name);
    newCateg.innerHTML = `
    <span class="color"></span> ${categ.name}
          <span class="cards-number">${categ.NoOfCards}</span>`;
    categList.appendChild(newCateg);
  }
  static addCard(id, i) {
    const li = document.createElement("li"),
      card = cards[id];
    li.className = `card${+i === 0 ? " current" : ""}`;
    li.innerHTML = `
    <span class="a-div inner-card">
      <span class="a-div inner-front"> ${card.quez} </span>
      <span class="a-div inner-back"> ${card.ans} </span>
    </span>
  `;
    cardsList.appendChild(li);
  }
  static showCards(name, ...ids) {
    cardsList.innerHTML = "";
    if (ids.length < 1) {
      categCards.classList.remove(categCards.classList[1]);
      return categCards.classList.add("zero-cards");
    }
    categCards.classList.remove(categCards.classList[1]);
    categCards.classList.add("cards");
    categName.innerText = name;
    ids.forEach((id, i) => {
      UI.addCard(id, i);
    });
    UI.setCurrentIndex(document.querySelector(".card.current"));
  }
  static getCategCards(name) {
    let categorieCardIds = [];
    Object.keys(cards).forEach((card) => {
      if (card.split("_S_")[0] == name) {
        categorieCardIds.push(card);
      }
    });
    UI.setAddBtns(name);
    UI.showCards(name, ...categorieCardIds);
  }
  static setAddBtns(id) {
    addCardBtns.forEach((one) => {
      one.setAttribute("data-categ-id", id);
    });
    addingCardForm.setAttribute("data-categ-id", id);
    deleteAllCards.setAttribute("data-categ-id", id);
  }
  static changeCurrCard(e) {
    const currCard = document.querySelector(".card.current"),
      direction = this.id;
    if (document.querySelector(".card.flipped")) {
      document.querySelector(".card.flipped").classList.remove("flipped");
    }
    currCard.classList.remove("current");
    direction === "forward"
      ? currCard.nextElementSibling
        ? currCard.nextElementSibling.classList.add("current")
        : currCard.parentElement.firstElementChild.classList.add("current")
      : currCard.previousElementSibling
      ? currCard.previousElementSibling.classList.add("current")
      : currCard.parentElement.lastElementChild.classList.add("current");
    UI.setCurrentIndex(document.querySelector(".card.current"));
  }
  static setCurrentIndex(child) {
    let childArr = child.parentElement.children,
      currIndex;
    for (let i = 0; i < childArr.length; i++) {
      if (childArr[i] == child) {
        currIndex = i;
        break;
      }
    }
    backwardForward.querySelector("p").innerText = `${currIndex + 1} / ${
      childArr.length
    }`;
  }
}

function getComponents() {
  let categs = Object.values(categories);
  categList.innerHTML = "";
  if (categs.length > 0) {
    categs.forEach((categ) => {
      UI.addCateg(categ);
    });
  }
}
function categEventListeners() {
  addNewCategBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addingCategForm.classList.add("active");
  });
  categCancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addingCategForm.classList.remove("active");
  });
  addingCategForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (UI.checkInput(newCategName)) {
      let newCateg = new Categ(newCategName.value.trim());
      UI.addCateg(newCateg);
      newCategName.value = "";
      return addingCategForm.classList.remove("active");
    }
    alert("Enter a valid name!");
  });
  categList.addEventListener("click", (e) => {
    let trgt = e.target,
      categName =
        trgt.dataset.categName || trgt.parentElement.dataset.categName || false;
    categName ? UI.getCategCards(categName) : undefined;
    document.querySelector(`.categories .active`)
      ? document.querySelector(`.categories .active`).classList.remove("active")
      : undefined;
    document
      .querySelector(`li[data-categ-name="${categName}"]`)
      .classList.add("active");
  });
}

function cardsEventListeners() {
  categCards.addEventListener("click", (e) => {
    if (e.target.id === "add-card") {
      document.body.classList.add("adding-card-active");
    }
  });
  addingCardModule.addEventListener("click", function (e) {
    if (e.target == this) {
      document.body.classList.remove("adding-card-active");
    }
  });
  addingCardForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (UI.checkInput(addingCardFace) && UI.checkInput(addingCardBack)) {
      UI.addCard(
        new Card(
          this.dataset.categId,
          addingCardFace.value,
          addingCardBack.value
        ).id
      );
      addingCardFace.value = "";
      addingCardBack.value = "";
      UI.getCategCards(this.dataset.categId);
      getComponents();
      return document.body.classList.remove("adding-card-active");
    }
    alert("Insert Valid values!");
  });
  cardsList.addEventListener("click", function (e) {
    this.querySelector(".current").classList.toggle("flipped");
  });
  nextCard.addEventListener("click", UI.changeCurrCard);
  prevCard.addEventListener("click", UI.changeCurrCard);
  deleteAllCards.addEventListener("click", function (e) {
    const categId = this.dataset.categId;
    categories[categId].relatedCardsIds.forEach((one) => delete cards[one]);
    categories[categId].NoOfCards = 0;

    getComponents();
    document.querySelector(`li[data-categ-name="${categId}"]`).click();
    LS.saveToLS("cards", cards);
    LS.saveToLS("categs", categories);
  });
}

getComponents();
cardsEventListeners();
categEventListeners();
