class Database {
    constructor() {
        this.data = JSON.parse(localStorage.getItem("items")) || [];
    }

    // Inserir
    insert(item) {
        item.id = this.data.length ? this.data[this.data.length - 1].id + 1 : 1;
        this.data.push(item);
        this.save();
        return item;
    }

    // Listar todos
    list() {
        return this.data;
    }

    // Procurar pelo ID
    findById(id) {
        return this.data.find(item => item.id === id);
    }

    // Alterar
    update(id, updatedItem) {
        const index = this.data.findIndex(item => item.id === id);
        if (index !== -1) {
            this.data[index] = { ...this.data[index], ...updatedItem };
            this.save();
            return this.data[index];
        }
        return null;
    }

    // Apagar
    delete(id) {
        this.data = this.data.filter(item => item.id !== id);
        this.save();
    }

    // Salvar no localStorage
    save() {
        localStorage.setItem("items", JSON.stringify(this.data));
    }
}

// Exemplo de uso:
const db = new Database();
db.insert({ name: "Item 1", description: "Primeiro item" });
console.log(db.list());
