const user_input = document.querySelector("#article");
const submit_btn = document.querySelector("#submit");
const result = document.querySelector("#results");
const loader = document.querySelector(".loader");

const submit_user_value = event => {
  event.preventDefault();
  const value = user_input.value;
  console.log(value);
  postData("/", { value: value });
  server_data();
};

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  try {
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

const server_data = async () => {
  await fetch("/data", {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(value => {
    value.json().then(data => {
      if (data[0].errors === undefined || data[0].errors === null)
        result.textContent = `${data[0].ai_info.text}`;
      else result.textContent = `${data[0].errors}`;
    });
  });
};

submit_btn.addEventListener("click", submit_user_value);
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.setAttribute("style", "display: none;");
  }, 1500);
});
