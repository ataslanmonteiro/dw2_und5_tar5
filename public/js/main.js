const API_URL = "http://localhost:3000/items";

// Adicionar item
document.getElementById("item-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;

    if (name && description) {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description })
        });

        populateTable();
        this.reset();
    }
});

// Listar itens
async function populateTable() {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";

    const response = await fetch(API_URL);
    const items = await response.json();

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

// Deletar item
async function deleteItem(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    populateTable();
}

// Editar item
async function editItem(id) {
    const response = await fetch(`${API_URL}/${id}`);
    const item = await response.json();

    const newName = prompt("Novo Nome:", item.name);
    const newDesc = prompt("Nova Descrição:", item.description);

    if (newName && newDesc) {
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: newName, description: newDesc })
        });

        populateTable();
    }
}

// Carregar dados ao iniciar
populateTable();
