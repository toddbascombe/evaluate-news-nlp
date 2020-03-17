const user_input = document.querySelector("#article");
const submit_btn = document.querySelector("#submit");
const result = document.querySelector("#results");
const loader = document.querySelector(".loader");
const div_error = document.querySelector(".error_message");
const form = document.querySelector(".blog_article");

const submit_user_value = event => {
  event.preventDefault();
  const regexExp = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  const regex = new RegExp(regexExp);
  if (user_input.value.match(regex)) {
    if (result.childElementCount > 0) {
      const list = document.querySelectorAll(".item");
      const list2 = document.querySelectorAll(".form_style_card");
      remove_NodeLists(list);
      remove_NodeLists(list2);
    }
    postData("/", { value: user_input.value });
    message_display_card(
      "",
      "div_loader",
      "<img src='./images/Infinity.svg' />"
    );
    const div_loader = document.querySelector(".div_loader");
    result.setAttribute("style", "background-color: #f1f2f3");
    setTimeout(() => {
      div_loader.remove();
      server_data();
    }, 1000);
  } else {
    message_display_card(
      "error you must enter a url with: (http or https)://www.google.com",
      "error_m",
      (image = ""),
      false
    );
    const error_m = document.querySelector(".error_m");
    setTimeout(() => {
      error_m.remove();
    }, 3000);
  }
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
    return response;
  } catch (err) {
    return err;
  }
};

const server_data = async () => {
  await fetch("/data").then(value => {
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

const message_display_card = (
  text = "",
  classname,
  image = "",
  toResult = true
) => {
  const div = document.createElement("div");
  div.className = classname;
  if (text.length > 1) {
    div.textContent = text;
  } else {
    div.innerHTML = image;
  }
  if (toResult) {
    result.appendChild(div);
  } else {
    form.appendChild(div);
  }
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
    "individCard",
    "item"
  ]);
  stat_card(
    "Subjectivity",
    subjectivity,
    Math.round(subjectivity_confidence * 100) + "%",
    ["statCard", "individCard", "item"]
  );
};

const remove_NodeLists = nodeList => {
  nodeList.forEach(value => value.remove());
};

submit_btn.addEventListener("click", submit_user_value);
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.setAttribute("style", "display: none;");
  }, 1500);
});
