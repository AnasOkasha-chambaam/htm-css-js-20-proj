function tEffect(anAr, speed) {
  console.log(anAr);
  let str = anAr.innerText,
    i = 0;
  console.log(str);
  anAr.innerText = "";
  function typeStr() {
    if (i < str.length) {
      setTimeout(() => {
        anAr.innerHTML += str[i];

        i++;
        typeStr();
      }, speed);
    } else {
      console.log("done");
    }
  }
  setTimeout(() => {
    typeStr();
  }, 1000);
}
