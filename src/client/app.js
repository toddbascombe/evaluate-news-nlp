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
      if (data[0].errors === undefined || data[0].errors === null) {
        message_display_card(
          `Article Text: ${data[0].ai_info.text}`,
          "form_style_card"
        );
        cards_for_data(data[0].ai_info);
      } else {
        message_display_card(`${data[0].errors}`, "form_style_card");
      }
    });
  });
};

const message_display_card = (text, classname) => {
  const div = document.createElement("div");
  div.className = classname;
  const textContent = document.createTextNode(text);
  div.appendChild(textContent);
  result.appendChild(div);
};

const stat_card = (text, anotherText, classname) => {
  const div = document.createElement("div");
  const innerDiv = document.createElement("div");
  div.classList.add(...classname);
  const textContent = document.createTextNode(text);
  const textContent2 = document.createTextNode(anotherText);
  div.appendChild(textContent);
  innerDiv.appendChild(textContent2);
  div.appendChild(innerDiv);
  result.appendChild(div);
};

const cards_for_data = ({
  polarity,
  subjectivity,
  polarity_confidence,
  subjectivity_confidence
}) => {
  stat_card(polarity, polarity_confidence, ["statCard", "individCard"]);
  stat_card(subjectivity, subjectivity_confidence, ["statCard", "individCard"]);
};

submit_btn.addEventListener("click", submit_user_value);
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.setAttribute("style", "display: none;");
  }, 1500);
});
