const user_input = document.querySelector("#article");
const submit_btn = document.querySelector("#submit");


const submit_user_value = (event) => {
    event.preventDefault();
    const value = user_input.value
    console.log(value)
    postData("/", { "value": value });
    server_data()
}


const postData = async(url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        server_data()
    } catch (err) {
        console.log(err)
    };
}



const server_data = async() => {
    await fetch("/aidata").then(value => {
        console.log(value)
    })
}

submit_btn.addEventListener("click", submit_user_value);