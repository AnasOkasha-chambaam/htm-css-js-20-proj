const postData = async (url = "", data = "") => {
  let resp = await fetch(url, {
    method: "POST",
    mode: "no-cors",
    cache: "default",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  console.log("==");
  console.log("aaa", await resp.json());
  // aD = await resp.json();
  return aD;
};

let theUrl = "https://taxes.like4app.com/online/create_order",
  theData = {
    deviceId:
      "0fa406d35f07d08c07a9ade273a66cec3e1da6c628e4cc8f64d6e7bc171f0050",
    email: "7TGamerx@gmail.com",
    password: "2046bc37b1b1af07975efc975eb432ff",
    securitycode:
      "733c7944b4abbdd73cd5wb1e10c6d238c97192d1d2efeeac1d318e3b2c9ff615",
    phone: 966593661188,
    hash_key: "8Tyr4EDw!2sN",
    secret_key: "t-3zafRa",
    secret_iv: "St@cE4eZ",
  };

postData(theUrl, theData)
  .then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call
  })
  .catch((err) => {
    console.log(err);
  });
