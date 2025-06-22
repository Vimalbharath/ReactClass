function addEmployee() {
    const nameInput = document.getElementById("employeeName");
    const name = nameInput.value.trim();
    if (name === "") {
        alert("Please enter a valid name.");
        return;
    }

    const list = document.getElementById("employeeList");
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `${name} <button class='btn btn-danger btn-sm' onclick='removeEmployee(this)'>Remove</button>`;

    list.appendChild(li);
    nameInput.value = "";
}

function removeEmployee(button) {
    button.parentElement.remove();
}
