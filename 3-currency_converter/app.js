const currSelOne = document.getElementById("curr-one"),
  currValOne = document.getElementById("curr-val-one"),
  currSelTwo = document.getElementById("curr-two"),
  currValTwo = document.getElementById("curr-val-two"),
  rate = document.getElementById("rate"),
  swap = document.getElementById("swap"),
  headr = document.getElementById("headr"),
  metalSel = document.getElementById("metal"),
  metalPriceP = document.getElementById("metal-price");

const calc = async (e) => {
  let currency_one = currSelOne.value,
    currency_two = currSelTwo.value;
  const resp = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${currency_one}`
    ),
    data = await resp.json();

  currValTwo.value = (currValOne.value * data.rates[currency_two]).toFixed(2);
  rate.innerText = `1 ${currency_one} = ${data.rates[currency_two]} ${currency_two}`;

  //   for metals
  metalPrice();
};

currSelOne.addEventListener("change", calc);
currValOne.addEventListener("input", calc);
currSelTwo.addEventListener("change", calc);
currValTwo.addEventListener("input", calc);
metalSel.addEventListener("change", calc);

swap.addEventListener("click", (e) => {
  let any = currSelOne.value;
  currSelOne.value = currSelTwo.value;
  currSelTwo.value = any;
  calc();
});

calc();

// typing effect
function typing(elm, tim) {
  console.log(elm.innerText);
  let str = elm.innerText,
    typingV = "";
  elm.innerText = "";
  let i = 0;
  function subT() {
    if (i < str.length) {
      setTimeout(() => {
        typingV += str[i];
        // console.log(typingV);
        elm.innerText = typingV;
        i++;
        subT();
      }, tim);
    }
  }
  subT();
}

// document.addEventListener("");
document.addEventListener("DOMContentLoaded", (e) => {
  //   console.log(headr.innerText);
  typing(headr, 40);
});

// for metal

async function metalPrice() {
  let currency_one = currSelOne.value,
    currency_two = currSelTwo.value;
  const resp = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`),
    data = await resp.json();

  const myHeaders = new Headers();
  myHeaders.append("x-access-token", "goldapi-4es8kcuki3ha9ma-io");
  myHeaders.append("Content-Type", "application/json");
  let theD = new Date(Date.now()).toLocaleDateString().split("/").join("");
  let res = await fetch(`https://www.goldapi.io/api/${metalSel.value}/USD`, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    }),
    Mdata = await res.json();
  //   console.log(Mdata.price / 31.1034807);
  let USDMetalPrice = Mdata.low_price / 31.1034807;
  let thePrice =
    metalSel.value === "XAU"
      ? (USDMetalPrice * data.rates[currency_one] * 21) / 24
      : USDMetalPrice * data.rates[currency_one];
  metalPriceP.innerText = `1 gm ${metalSel.value} = ${thePrice.toFixed(
    1
  )} ${currency_one}`;
}
