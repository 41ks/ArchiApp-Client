// Get environment variable
const SERVER_URL = process.env.SERVER_URL;

function update(msgs) {
    console.log("update");
    // Delete all the previous messages
    let ul = document.getElementById("message-list");
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
    // Add the new messages
    for (e of msgs) {
        let li = document.createElement("li");
        let h3 = document.createElement("h3");
        h3.appendChild(document.createTextNode(e.time + " - " + e.pseudo));
        li.appendChild(h3);
        let p = document.createElement("p");
        p.appendChild(document.createTextNode(e.msg));
        li.appendChild(p);
        ul.appendChild(li);
    }
}

function sendMessage() {
    let pseudo = "Anonymous";
    let msg = document.getElementById("message").value;
    console.log("Sending message: " + msg);
    fetch(SERVER_URL + "/msg/post?pseudo=" + pseudo + "&msg=" + msg)
    .then(function(response) {
        if (response.code == -1) {
            console.error("Error while posting message");
        }
        return response.json();
    })
    .then(fetchAllMessages);
}

function toggleDarkMode() {
    let root = document.documentElement;
    if (root.classList.contains("dark-mode")) {
        root.classList.remove("dark-mode");
    } else {
        root.classList.add("dark-mode");
    }
}

function fetchAllMessages() {
    fetch(SERVER_URL + "/msg/getAll")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        update(data.msgs);
    });
}

fetchAllMessages();
alert("End of script.js");