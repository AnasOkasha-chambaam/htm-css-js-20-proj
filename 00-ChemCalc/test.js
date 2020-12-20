let anArr = [
  { id: 1, bolean: true },
  { id: 2, bolean: false },
  { id: 3, bolean: true },
  { id: 4, bolean: false },
];

let anotherArr = anArr
  .filter((one) => one.bolean !== false)
  .map((one) => {
    if (one.bolean) {
      return one;
    }
  });
// console.log(anotherArr);

function findSolution(target) {
  function find(current, history) {
    if (current == target) {
      return history;
    } else if (current > target) {
      return null;
    } else {
      return (
        find(current + 5, `(${history} + 5)`) ||
        find(current * 3, `(${history} * 3)`)
      );
    }
  }
  return find(1, "1");
}
// console.log(findSolution(15));
// for (let i = 0; i < 100; i++) {
//   console.log(i);
//   console.log(findSolution(i));
// }

let getMin = (a, b) => {
  if (a < b) {
    return a;
  } else {
    return b;
  }
};

console.log(-2 % 2 === 0);
