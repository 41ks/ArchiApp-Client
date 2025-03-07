function fact(n) {
    if (n == 0) {
        return 1;
    } else {
        return n * fact(n - 1);
    }
}

function applique(f, tab) {
    let res = [];
    for (e of tab) {
        res.push(f(e));
    }
    return res;
}

msgs = [
    { "pseudo": "Alice", "time": "07/03/2025 à 15h00", "msg": "Hello World" },
    { "pseudo": "Bob", "time": "07/03/2025 à 15h02", "msg": "Blah Blah" },
    { "pseudo": "Alice", "time": "07/03/2025 à 15h05", "msg": "I love cats" }
];

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

function toggleDarkMode() {
    let root = document.documentElement;
    if (root.classList.contains("dark-mode")) {
        root.classList.remove("dark-mode");
    } else {
        root.classList.add("dark-mode");
    }
}