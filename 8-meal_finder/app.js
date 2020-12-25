console.log("Hey, sweety");
const searchInp = document.getElementById("search-inp"),
  sBtn = document.getElementById("search-btn"),
  rBtn = document.getElementById("random-btn"),
  results = document.getElementById("results"),
  subH = document.querySelector(".sub-headlline"),
  mealModal = document.getElementById("meal-info-modal");
let currMeals = [];
function tEffect(anAr, speed) {
  let str = anAr.innerText,
    i = 0;
  anAr.innerText = "";
  function typeStr() {
    if (i < str.length) {
      setTimeout(() => {
        anAr.innerHTML += str[i];

        i++;
        typeStr();
      }, speed);
    } else {
      // console.log("done");
    }
  }
  setTimeout(() => {
    typeStr();
  }, 1000);
}
const toSearch = async (e) => {
  let sVal = searchInp.value,
    theUrl = `https://www.themealdb.com/api/json/v1/1/search.php?${
      sVal.length == 1 ? "f" : "s"
    }=${sVal}`,
    res = await fetch(theUrl),
    data = await res.json(),
    meals = data.meals;
  currMeals = data.meals;
  // console.table(meals);
  results.innerHTML = `
  <h1>results</h1>
  <div class="the-res mul">
    ${meals
      .map((one, index) => {
        return `<div class="a-meal img-${index} w-${Math.ceil(
          Math.random() * 100 > 49 ? 1 : Math.ceil(Math.random() * 3)
        )} h-${
          Math.random() * 100 > 49 ? Math.ceil(Math.random() * 3) : 1
        }" data-mealId="${one.idMeal}" style="animation-delay: 0.${index + 4}s">
      <img src="${one.strMealThumb}" />
      <h3 class="name">${one.strMeal}</h3>
    </div>`;
      })
      .join("")}
  </div>
  `;

  //   UI.showRes(data);
};

tEffect(subH, 10);

sBtn.addEventListener("click", toSearch);
searchInp.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    // console.log("h");
    return toSearch(e);
  }
});
results.addEventListener("click", (e) => {
  let theMealDiv = e.target.parentElement,
    currMeal = undefined,
    theMealId = undefined;
  if (theMealDiv.classList.contains("a-meal")) {
    theMealId = theMealDiv.getAttribute("data-mealId");
    // console.log(theMealId);
    currMeals.forEach((one) => {
      if (one.idMeal == theMealId) {
        currMeal = one;
      }
    });
  }
  if (currMeal) {
    // console.log(currMeal);

    let integ = [];
    for (let i = 0; i < 20; i++) {
      if (currMeal[`strIngredient${i}`]) {
        integ.push(
          `${currMeal[`strIngredient${i}`]}: ${currMeal[`strMeasure${i}`]}`
        );
      }
    }

    mealModal.innerHTML = `
    <div class="modal-content meal-${currMeal.idMeal}">
          <div class="curr-img">
            <img src="${currMeal.strMealThumb}" />
            <a target="_blank" href="${currMeal.strYoutube}">
              <i class="fab fa-youtube"></i>
            </a>
          </div>
          <h3 class="curr-name">${currMeal.strMeal} - ${currMeal.strArea}</h3>
          <div class="ingredients">
            <p class="items">
            ${integ
              .map((one, inde) => {
                return `<span class="item" style="transition-delay: ${
                  0.5 + inde * 0.1
                }s"> ${one} </span>`;
              })
              .join("")}
            </p>
          </div>
          <div class="method">
            <p>
              ${currMeal.strInstructions.split(".").join(". \n \n")}
            </p>
          </div>
        </div>
    `;
    document.body.classList.add("show-a-meal");
  }
  currMeal = undefined;
});

mealModal.addEventListener("click", (e) => {
  if (e.target.id === "meal-info-modal") {
    document.body.classList.remove("show-a-meal");
  }
});
