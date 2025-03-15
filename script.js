const SERVER_URL = "https://archiapp-server.onrender.com";

function update(msgs) {
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

function sendMessage(event) {
    event.preventDefault();
    let pseudo = document.getElementById("pseudo").value || "Anonymous";
    let msg = document.getElementById("message").value;
    document.getElementById("message").value = "";
    console.log("Sending message: " + msg);
    fetch(SERVER_URL + "/msg/post?pseudo=" + pseudo + "&msg=" + msg)
        .then(function (response) {
            if (response.code == -1) {
                console.error("Error while posting message");
            }
            return response.json();
        })
        .then(fetchAllMessages);
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

function fetchAllMessages() {
    fetch(SERVER_URL + "/msg/getAll")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            update(data.msgs);
        });
}

fetchAllMessages();