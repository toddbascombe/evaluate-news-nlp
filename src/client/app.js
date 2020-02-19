const user_input = document.querySelector("#article");
const submit_btn = document.querySelector("#submit");


const submit_user_value = (event) => {
    event.preventDefault();
    const value = user_input.value
    console.log(value)
    postData("/", { "value": value })
}


const postData = async(url = "", data = {}) => {
    await fetch(url, {
            method: "POST",
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.text()) // convert to plain text
        .then(text => console.log(text));
}

submit_btn.addEventListener("click", submit_user_value);