const boody = document.querySelector("body");

// boody.addEventListener('click',(e) => {
//     if(!e.target.classList.contains('go-up') || !e.target.classList.contains('fa-level-up-alt') || e.target.id !== 'submitt' || e.target.classList !== 'my-em'){
//         e.preventDefault()
//     }else{
//         console.log(e.target)
//     }
//     // console.log(e.target)
// })

// What we need from web
const nameInp = document.getElementById("name-inp"),
  costInp = document.getElementById("cost-inp"),
  submitt = document.getElementById("submitt"),
  theForm = document.getElementById("form"),
  filter = document.getElementById("filter"),
  chemList = document.getElementById("chem-list"),
  toCookList = document.getElementById("to-cook-list"),
  totalCost = document.getElementById("total-cost"),
  upBtn = document.getElementById("up-btnn"),
  allLists = document.querySelector(".lists"),
  chems = JSON.parse(localStorage.getItem("chems")) || [],
  chosenChem = JSON.parse(localStorage.getItem("chosenChem")) || [];

class aChem {
  constructor(id, name, value) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.chosen = false;
  }
}

class UI {
  static editChosenList() {
    console.log(chems);
    chems.forEach((one) => {
      if (toCookList.classList.contains(one.id)) {
        one.chosen = true;
        chosenChem.push(one);
      }
    });

    console.log(chosenChem);
  }
}

theForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let ER = 0;
  nameInp.value = nameInp.value.trim();
  Array.from(chemList.children).forEach((onee) => {
    if (onee.querySelector("#name").innerHTML === nameInp.value) {
      ER = 1;
    }
    //  console.log(one)
    // if(nameInp.value === one.querySelector('#name'))
  });

  if (
    ER === 1 ||
    nameInp.value === "" ||
    nameInp.value === " " ||
    nameInp.value === "  "
  ) {
    nameInp.classList.add("errr");
    // console.log(1)
    setTimeout(() => {
      nameInp.classList.remove("errr");
      // console.log(2)
    }, 2000);
  } else if (costInp.value === "" || costInp.value < 0) {
    costInp.classList.add("errr");
    setTimeout(() => {
      costInp.classList.remove("errr");
    }, 2000);
  } else {
    const newChem = new aChem(
      `item-${
        chems.length > 0
          ? parseInt(chems[chems.length - 1].id.split("-")[1]) + 1
          : 1
      }`,
      nameInp.value,
      parseInt(`${costInp.value}`)
    );
    chems.push(newChem);
    const li = document.createElement("li");
    li.classList.add("item");
    // console.log(parseInt(chemList.lastElementChild.id.split('-')[1]) + 1)
    li.id = newChem.id;
    li.innerHTML = `
        <span class="lft"> 
        <span id="name">${newChem.name}</span>
        </span>
        <span class="btns">
        <span id="price">${newChem.value}</span>
        <a href="#" id="edit">
        <i class="fas fa-pencil-alt"></i>
        </a>
        <a href="#" id="add">
        <i class="fas fa-plus"></i></a><a href="#" id="delete"><i class="fas fa-trash-alt"></i>
        </a>
        </span>
        `;
    chemList.appendChild(li);

    nameInp.value = "";
    costInp.value = "";
    localStorage.setItem("chems", JSON.stringify(chems));
  }
});

allLists.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.parentElement.id === "add") {
    e.target.parentElement.parentElement.parentElement.classList.toggle(
      "chosen"
    );
    toCookList.classList.toggle(
      e.target.parentElement.parentElement.parentElement.id
    );
    UI.editChosenList();
  }
  if (e.target.parentElement.id === "delete") {
    e.target.parentElement.parentElement.parentElement.remove();
  }
});
