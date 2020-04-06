const user_input = document.querySelector("#article");
const submit_btn = document.querySelector("#submit");
const result = document.querySelector("#results");
const loader = document.querySelector(".loader");

import {
  remove_NodeLists,
  cards_for_data,
  message_display_card
} from "./js/utils";

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
    const div_loader = document.querySelector("#div_loader");
    div_loader.style.cssText="display: block;";
    result.setAttribute("style", "background-color: #f1f2f3");
    setTimeout(() => {
      div_loader.style.cssText="display: none;";
      server_data();
    }, 1000);
  } else {
    message_display_card(
      "error you must enter a url with: (http or https)://www.google.com",
      "error_m",
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
submit_btn.addEventListener("click", submit_user_value);
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.setAttribute("style", "display: none;");
  }, 1500);
});

export { submit_user_value, server_data, postData };
