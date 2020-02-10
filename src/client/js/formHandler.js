const submit_btn = document.querySelector("#submit");
const input_value = document.querySelector("#text");

//sumbit text to the server
const submit = event => {
  event.preventDefault();
  postdata("/", input_value.value);
};

const postdata = async (url, data) => {
  const res = await fetch(url, {
    method: "post",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  try {
    const server_res = await res.JSON.parse();
    console.log(server_res);
  } catch (err) {
    console.log("error at line 19 try block", err);
  }
};

//listen for a click on submit button
submit_btn.addEventListener("click", submit);
export { submit, postdata };
