let arr = [1, 2];
const toList = (Arr) => {
  let lisst,
    revAr = Arr.reverse();
  revAr.forEach((one) => {
    // console.log("--", one);
    lisst = { value: one, rest: lisst };
  });
  //   console.log("---", lisst);
  Arr.reverse();
  return lisst;
};

// console.log(toList(arr));

const toArr = (lissst) => {
  let theArr = [];
  const subToArr = (lis) => {
    theArr.push(lis.value);
    // console.log("====", lissst);
    if (lis.rest) {
      subToArr(lis.rest);
    }
  };
  subToArr(lissst);
  return theArr;
};

// console.log(toArr(toList(arr)));

const prepend = (elm, list) => {
  //   console.log(list);
  let anan = toArr(list);
  //   console.log(anan);
  anan.unshift(elm);
  return toList(anan);
};
// console.log("-------========");
// console.log(prepend("an-imp", toList(arr)));

const nth = (list, num) => {
  let anArr = toArr(list);
  return anArr[num] ? anArr[num] : undefined;
};

console.log(nth(toList(arr), 55));

// let arr = 1;
