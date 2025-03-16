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
        let sub = document.createElement("p");
        if (e.time) {
            sub.classList.add("subtitle");
            let dateStr = Intl.DateTimeFormat("fr-FR", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric"
            }).format(new Date(e.time));
            sub.appendChild(document.createTextNode(dateStr));
            li.appendChild(sub);
        }
        let p = document.createElement("p");
        p.appendChild(document.createTextNode(e.msg));
        li.appendChild(p);
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

// Check if dark mode is enabled
if (localStorage.getItem("dark-mode") === "true") {
    toggleDarkMode();
}

// Check if a pseudo is saved
if (localStorage.getItem("pseudo")) {
    document.getElementById("pseudo").value = localStorage.getItem("pseudo");
}

// Fetch all messages
fetchAllMessages();
