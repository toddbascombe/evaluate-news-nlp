import { submit_user_value, server_data, postData } from "./app.js";
import {
  remove_NodeLists,
  cards_for_data,
  message_display_card
} from "./js/utils.js";
import "./styles/base.scss";
import "./styles/footer.scss";
import "./styles/form.scss";
import "./styles/header.scss";
import "./styles/loader.scss";
import loop from "./images/Infinity.svg";

const infLoop = document.querySelector("#loading");
const infLoop2 = document.querySelector(".div_loader");
infLoop.src = loop;
infLoop2.src = loop;

export {
  submit_user_value,
  server_data,
  postData,
  remove_NodeLists,
  cards_for_data,
  message_display_card
};
