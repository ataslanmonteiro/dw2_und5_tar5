document.getElementById("item-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;

    if (name && description) {
        db.insert({ name, description });
        populateTable();
        this.reset();
    }
});

function populateTable() {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";

    const items = db.list();
    items.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.description}</td>
            <td>
                <button onclick="editItem(${item.id})">Editar</button>
                <button onclick="deleteItem(${item.id})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function deleteItem(id) {
    db.delete(id);
    populateTable();
}

function editItem(id) {
    const item = db.findById(id);
    if (item) {
        const newName = prompt("Novo Nome:", item.name);
        const newDesc = prompt("Nova Descrição:", item.description);

        if (newName && newDesc) {
            db.update(id, { name: newName, description: newDesc });
            populateTable();
        }
    }
}

// Inicializa a tabela
populateTable();
