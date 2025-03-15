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
        h3.appendChild(document.createTextNode(e.pseudo));
        li.appendChild(h3);
        // Time as subtitle
        let sub = document.createElement("p");
        sub.classList.add("subtitle");
        sub.appendChild(document.createTextNode(e.time));
        li.appendChild(sub);
        // Message as paragraph
        let p = document.createElement("p");
        p.appendChild(document.createTextNode(e.msg));
        li.appendChild(p);
        // Append the message to the list
        ul.appendChild(li);
    }
}

function sendMessage(event) {
    event.preventDefault();
    let pseudo = document.getElementById("pseudo").value;
    if (pseudo !== "") {
        localStorage.setItem("pseudo", pseudo);
    } else {
        pseudo = "Anonymous";
    }
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
    let res = document.body.classList.toggle("dark-mode");
    localStorage.setItem("dark-mode", res);
    document.getElementById("dark-mode").innerText = res ? "Mode clair" : "Mode sombre";
}

function fetchAllMessages() {
    fetch(SERVER_URL + "/msg/getAll")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            update(data.msgs);
            window.scrollTo(0, document.body.scrollHeight);
        });
}

if (localStorage.getItem("dark-mode") === "true") {
    toggleDarkMode();
}

if (localStorage.getItem("pseudo")) {
    document.getElementById("pseudo").value = localStorage.getItem("pseudo");
}

fetchAllMessages();
