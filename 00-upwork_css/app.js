let st =
  "@import url('any.css');body{background:red;}  body h1{background:green;} h1{color:#333}.any{color: yellow}\n@media (max-width: 200px) {body{border: white}}\n body{border: 10px solid white}@media (max-width: 200px) {body{border:20px solid white}} \n@import url('any.css')";
async function inlineSt(str) {
  str = str.trim().replace(/\r?\n|\r/g, "");
  if (str) {
    let res = str.split("{").map((one) => one.split("}")),
      i = 0,
      x = 0;
    console.log(res);
    console.log(";;", i, x);
    do {
      let nwRes = res[i][x].trim();
      if (nwRes.startsWith("@import")) {
        let arr = nwRes.indexOf(";") > -1 ? nwRes.split(";") : nwRes,
          url;
        if ((url = arr[0].match(/\(['"]([^]+\.css)['"]\)/))) {
          let call = await fetch(url[1]),
            resp = await call.text();
          inlineSt(await resp);
        }
        res[i] =
          i == 0 && typeof arr == "object" ? arr.reverse() : arr.split(";");
      }
      if (/^[\.#\w]/.test(nwRes)) {
        let theElm = document.querySelector(nwRes);
        if (theElm) {
          theElm.setAttribute(
            "style",
            (theElm.getAttribute("style") ? theElm.getAttribute("style") : "") +
              ";" +
              res[i + 1][0]
          );
        }
      }

      // console.log("-_-", document.querySelector(res[i][x]))

      console.log(i, x);
      x = 1;
      i++;
    } while (res[i][x]);
    console.log(res[i][x], i, x);
  }
}

window.addEventListener("DOMContentLoaded", (e) => {
  console.log("DOM fully loaded and parsed");
  inlineSt(st);
});
