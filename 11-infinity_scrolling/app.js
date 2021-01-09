const filterInp = document.getElementById("filter"),
  toTxt = document.getElementById("to-txt"),
  results = document.getElementById("results"),
  loadingAnim = document.querySelector(".loading");

let limit = 5,
  page = 1,
  allPosts = [];

function appendAPost(item) {
  let div = document.createElement("div");
  div.className = "a-post";
  div.id = `post-${item.id}`;
  let spanId = document.createElement("span"),
    h3 = document.createElement("h3"),
    p = document.createElement("p");
  spanId.className = `post-no`;
  spanId.innerText = `${item.id}`;
  h3.className = "titles";
  h3.innerText = `${item.title}`;
  p.className = "txt";
  p.innerText = `${item.body}`;
  div.appendChild(spanId);
  div.appendChild(h3);
  div.appendChild(p);
  results.appendChild(div);
}

const fetchPosts = async () => {
  let resp = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
    ),
    data = await resp.json();
  if (data) {
    if (data[0] || data.id) {
      for (item of data) {
        appendAPost(item);
      }
      page++;
      loadingAnim.style.opacity = "0";
    }
  }
  loadingAnim.style.opacity = "0";
  allPosts = [...allPosts, ...data];
};

fetchPosts();
window.addEventListener("scroll", (e) => {
  let { clientHeight, scrollHeight, scrollTop } = document.documentElement;
  if (scrollHeight - scrollTop - clientHeight <= 0) {
    // fetchPosts();
    loadingAnim.style.opacity = "1";
    setTimeout(() => {
      fetchPosts();
    }, 1000);
  }
});

function filterPosts(value) {
  results.innerHTML = ``;
  console.log(
    allPosts.filter((one) => {
      return one.title.indexOf(value) > -1 || one.body.indexOf(value) > -1;
    })
  );
  allPosts
    .filter((one) => {
      return one.title.indexOf(value) > -1 || one.body.indexOf(value) > -1;
    })
    .forEach((one) => {
      appendAPost(one);
    });
}

filterInp.addEventListener("keydown", (e) => {
  if (e.keyCode > 47 || e.keyCode === 32) {
    let span = document.createElement("span");
    span.className = "letter";
    span.innerText = `${e.keyCode != 32 ? e.key : "\xa0"}`;
    toTxt.appendChild(span);
  }
  if (e.key === "Backspace") {
    if (toTxt.lastElementChild) {
      toTxt.lastElementChild.remove();
    }
  }
  if (e.key == "ctrl") {
    toTxt.innerHTML = "";
    filterInp.value.split("").forEach((one) => {
      let span = document.createElement("span");
      span.className = "letter";
      span.innerText = `${one != " " ? one : "\xa0"}`;
      toTxt.appendChild(span);
    });
  }
});
filterInp.addEventListener("keyup", (e) => {
  console.log("-", e.target.value);
  filterPosts(filterInp.value);
});
