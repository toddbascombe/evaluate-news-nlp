const div_error = document.querySelector(".error_message");
const form = document.querySelector(".blog_article");
const results = document.querySelector("#results");

/**
 * Remove all the element in the Array
 * @param {Array} nodeList a list of elements i a div
 */
const remove_NodeLists = nodeList => {
  nodeList.forEach(value => value.remove());
};

/**
 * display info on the results of the returned info
 *
 */
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

//creates div cards to display data
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
  input_test_stat_card()
  results.appendChild(div);
};


const input_test_stat_card = (title, text, anotherText, classname) =>{
  if(title && test && anotherText && classname){
    return "success"
  }else{
    return 'error'
  }
}

module.exports = input_test_stat_card;

/**
 *
 * @param {*} text (String) information in the card
 * @param {*} classname (Array) of class names
 * @param {*} image (string) image element
 * @param {*} toResult (boolean)
 */
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
    results.appendChild(div);
  } else {
    form.appendChild(div);
  }
};

export { remove_NodeLists, cards_for_data, message_display_card };
