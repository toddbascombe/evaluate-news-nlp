const user_input = document.querySelector("#article");
const submit_btn = document.querySelector("#submit");
const result = document.querySelector("#results");
const loader = document.querySelector(".loader");

const submit_user_value = event => {
  event.preventDefault();
  if (result.children.length > 0) {
    for (let i = 0; i <= result.children.length; i++) {
      result.children[i].remove();
    }
  }
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
        cards_for_data(data[0].ai_info);
        message_display_card(
          `Article Text: ${data[0].ai_info.text}`,
          "form_style_card"
        );
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

const stat_card = (title, text, anotherText, classname) => {
  const titleDiv = document.createElement("div");
  const div = document.createElement("div");
  const innerDiv = document.createElement("div");
  div.classList.add(...classname);
  innerDiv.className = "dataStat";
  titleDiv.className = "title";
  const titleConent = document.createTextNode(title);
  const textContent = document.createTextNode(text);
  const textContent2 = document.createTextNode(anotherText);
  div.appendChild(titleDiv);
  div.appendChild(textContent);
  titleDiv.appendChild(titleConent);
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
  stat_card("Polarity", polarity, Math.round(polarity_confidence * 100) + "%", [
    "statCard",
    "individCard"
  ]);
  stat_card(
    "Subjectivity",
    subjectivity,
    Math.round(subjectivity_confidence * 100) + "%",
    ["statCard", "individCard"]
  );
};

submit_btn.addEventListener("click", submit_user_value);
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.setAttribute("style", "display: none;");
  }, 1500);
});
