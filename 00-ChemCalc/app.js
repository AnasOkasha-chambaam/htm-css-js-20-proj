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
  editCont = document.getElementById("to-edit");

let chems = JSON.parse(localStorage.getItem("chems")) || [],
  chosenChem = JSON.parse(localStorage.getItem("chosenChem")) || [],
  cancelBtn = document.querySelector("#cancel") || null,
  editBtn = document.querySelector("#edit") || null,
  editName,
  editValue,
  editForm,
  toEdit;

class aChem {
  constructor(id, name, value) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.chosen = false;
  }
}

class UI {
  static startTheApp() {
    chemList.innerHTML = "";
    chems.forEach((one) => {
      UI.addNewChem(one);
    });
    toCookList.innerHTML = "";
    chosenChem.forEach((one) => {
      UI.addChoChem(one);
    });
    UI.calcChosCost();
  }
  static editChosenList() {
    toCookList.innerHTML = "";
    chosenChem = chems
      .filter((one) => one.chosen === true)
      .map((one) => {
        UI.addChoChem(one);
        return one;
      });
  }
  static calcChosCost() {
    let ttlCost = 0;
    chosenChem.forEach((one) => {
      ttlCost += parseInt(`${one.value}`);
    });
    totalCost.value = `Total cost is ${ttlCost} L.E`;
  }
  static addNewChem(item) {
    let li = document.createElement("li");
    li.className = `item ${item.chosen ? "chosen" : ""}`;

    li.id = item.id;
    li.innerHTML = `
        <span class="lft"> 
        <span id="name">${item.name}</span>
        </span>
        <span class="btns">
        <span id="price">${item.value}</span>
        <a href="#" id="edit">
        <i class="fas fa-pencil-alt"></i>
        </a>
        <a href="#" id="add">
        <i class="fas fa-plus"></i></a><a href="#" id="delete"><i class="fas fa-trash-alt"></i>
        </a>
        </span>
        `;
    chemList.appendChild(li);
  }
  static addChoChem(item) {
    let li = document.createElement("li");
    li.className = "item chosen";
    li.id = item.id;
    li.innerHTML = `
    <span class="lft"> <span id="name">${item.name}</span></span
    ><span class="btns">
      <input id="amount" type="number" class="${item.value}" placeholder="Amount in gms" />
      <a href="#" class="remove" id="add"><i class="fas fa-plus"></i></a
    ></span>
        `;
    toCookList.appendChild(li);
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
    // add a new item
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
    UI.addNewChem(newChem);
    nameInp.value = "";
    costInp.value = "";
    localStorage.setItem("chems", JSON.stringify(chems));
  }
});

allLists.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.parentElement.id === "add") {
    // add to chosen
    document
      .querySelectorAll(
        `#${e.target.parentElement.parentElement.parentElement.id}`
      )
      .forEach((one) => {
        one.classList.toggle("chosen");
      });
    // e.target.parentElement.parentElement.parentElement.classList.toggle(
    //   "chosen"
    // );
    const theId = e.target.parentElement.parentElement.parentElement.id;
    chems.forEach((one) => {
      if (one.id === theId) {
        one.chosen = !one.chosen;
      }
    });
    UI.editChosenList();
    UI.calcChosCost();
    localStorage.setItem("chems", JSON.stringify(chems));
    localStorage.setItem("chosenChem", JSON.stringify(chosenChem));
  }
  if (e.target.parentElement.id === "delete") {
    // completely delete
    chems.forEach((one, ind) => {
      if (one.id === e.target.parentElement.parentElement.parentElement.id) {
        chems.splice(ind, 1);
      }
    });
    chosenChem.forEach((one, ind) => {
      if (one.id === e.target.parentElement.parentElement.parentElement.id) {
        chosenChem.splice(ind, 1);
      }
    });
    UI.startTheApp();
  }
  if (e.target.parentElement.id === "edit") {
    let theId = e.target.parentElement.parentElement.parentElement.id;
    chems.forEach((one) => {
      if (theId === one.id) {
        toEdit = one;
      }
    });
    editCont.innerHTML = `
    <div class="content">
        <form class="cont">
          <input type="text" name="name" id="${toEdit.id}" value="${toEdit.name}">
          <input type="number" name="value" value="${toEdit.value}">
          <input type="submit" value="edit">
          <a href="#" id="cancel"><i class="fas fa-plus"></i></a
            >
        </form>
      </div>
    `;
    cancelBtn = document.querySelector("#cancel") || null;
    editBtn = document.querySelector("#edit") || null;
    editForm = document.querySelector("form.cont");
    editName = document.querySelector('form.cont input[type="text"]');
    editValue = document.querySelector('form.cont input[type="number"]');
    any();
  }
});
function any() {
  if (cancelBtn) {
    cancelBtn.addEventListener("click", (e) => {
      e.preventDefault();
      editCont.innerHTML = "";
    });
    if (editBtn) {
      editForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let ER = 0;
        editName.value = editName.value.trim();
        Array.from(chemList.children).forEach((onee) => {
          if (onee.querySelector("#name").innerHTML === editName.value) {
            ER = 1;
          }
          //  console.log(one)
          // if(editName.value === one.querySelector('#name'))
        });

        if (
          ER === 1 ||
          editName.value === "" ||
          editName.value === " " ||
          editName.value === "  "
        ) {
          editName.classList.add("errr");
          // console.log(1)
          setTimeout(() => {
            editName.classList.remove("errr");
            // console.log(2)
          }, 2000);
        } else if (editValue.value === "" || editValue.value < 0) {
          editValue.classList.add("errr");
          setTimeout(() => {
            editValue.classList.remove("errr");
          }, 2000);
        } else {
          // add a new item
          chems.forEach((one) => {
            if (one.id === toEdit.id) {
              one.name = editName.value;
              one.value = editValue.value;
            }
          });
          chosenChem.forEach((one) => {
            if (one.id === toEdit.id) {
              one.name = editName.value;
              one.value = editValue.value;
            }
          });
          localStorage.setItem("chems", JSON.stringify(chems));
          localStorage.setItem("chosenChem", JSON.stringify(chosenChem));
          editCont.innerHTML = "";
          UI.startTheApp();
        }
      });
    }
  }
}

any();
UI.startTheApp();
