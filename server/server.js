const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Simulação de banco de dados (arquivo JSON)
const DB_FILE = "server/database.json";

// Função para ler dados do "banco"
const readDatabase = () => {
    const data = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(data);
};

// Função para escrever dados no "banco"
const writeDatabase = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// Criar um novo item (CREATE)
app.post("/items", (req, res) => {
    const { name, description } = req.body;
    const items = readDatabase();
    const newItem = { id: items.length + 1, name, description };

    items.push(newItem);
    writeDatabase(items);

    res.status(201).json(newItem);
});

// Listar todos os itens (READ)
app.get("/items", (req, res) => {
    res.json(readDatabase());
});

// Buscar um item pelo ID (READ)
app.get("/items/:id", (req, res) => {
    const items = readDatabase();
    const item = items.find(i => i.id == req.params.id);
    
    if (item) res.json(item);
    else res.status(404).json({ error: "Item não encontrado" });
});

// Atualizar um item (UPDATE)
app.put("/items/:id", (req, res) => {
    const { name, description } = req.body;
    let items = readDatabase();
    
    const index = items.findIndex(i => i.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: "Item não encontrado" });

    items[index] = { ...items[index], name, description };
    writeDatabase(items);
    res.json(items[index]);
});

// Deletar um item (DELETE)
app.delete("/items/:id", (req, res) => {
    let items = readDatabase();
    const filteredItems = items.filter(i => i.id != req.params.id);

    if (items.length === filteredItems.length)
        return res.status(404).json({ error: "Item não encontrado" });

    writeDatabase(filteredItems);
    res.json({ message: "Item removido com sucesso!" });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
