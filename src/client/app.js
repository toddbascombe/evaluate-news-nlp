const user_input = document.querySelector("#article");
const submit_btn = document.querySelector("#submit");
const result = document.querySelector("#results");
const loader = document.querySelector(".loader");

import {
  remove_NodeLists,
  cards_for_data,
  message_display_card
} from "./js/utils";


/**
 *
 *@param {*} (event) submit value from user input to the server
 */

const submit_user_value = event => {
  event.preventDefault();
  //regex for a url
  const regexExp = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  const regex = new RegExp(regexExp);

  //check if the user input is a url
  if (user_input.value.match(regex)) {

    //check if there is anything displayed in the result section
    if (result.childElementCount > 0) {

      //select nodelist of item displayed
      const list = document.querySelectorAll(".item");
      const list2 = document.querySelectorAll(".form_style_card");

      //if the any items in both list and list2 remove the elements in the list
      if(list.length > 0){
        remove_NodeLists(list);
      }
      if(list2.length > 0){
        remove_NodeLists(list2);
      }
    }

    //send user input to the server
    postData("/", { value: user_input.value })

        //if the promise return a resolve, display the date to the screen by calling server data
        .then(()=> {
          const div_loader = document.querySelector("#div_loader");
          div_loader.style.cssText="display: block;";
          result.setAttribute("style", "background-color: #f1f2f3");
          setTimeout(() => {
            div_loader.style.cssText="display: none;";
            server_data();
          }, 1000);})

        /*
        if the promise return a reject display a custom error to the screen
        and removes after 2 seconds
         */
        .catch(() => {
          message_display_card(`${data[0].errors}`, "form_style_card");
          setTimeout(()=> {
            document.querySelector(".form_style_card").remove();
          }, 2000)
        });

  } else {

    //display a custom error msg if a url is not provide
    message_display_card(
      "error you must enter a url with: (http or https)://www.google.com",
      "error_m",
      false
    );

    //remove the custom error after 3 seconds.
    const error_m = document.querySelector(".error_m");
    setTimeout(() => {
      error_m.remove();
    }, 3000);
  }
};

/**
 *
 * @param url (string) path to post on the server
 * @param data (Object) data to send to the server
 * @returns {Promise<Response|*>}
 */
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
    return response;
  } catch (err) {
    return err;
  }
};

/**
 * server data get data from the server
 * @returns {Promise<void>}
 */

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


//listen for a click when the user submit input
submit_btn.addEventListener("click", submit_user_value);

//display loading screen until the contents are full loaded
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.setAttribute("style", "display: none;");
  }, 1500);
});

export { submit_user_value, server_data, postData };
