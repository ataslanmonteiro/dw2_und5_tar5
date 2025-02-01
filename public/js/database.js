class Database {
    constructor() {
        this.data = JSON.parse(localStorage.getItem("items")) || [];
    }

    insert(item) {
        item.id = this.data.length ? this.data[this.data.length - 1].id + 1 : 1;
        this.data.push(item);
        this.save();
        return item;
    }

    list() {
        return this.data;
    }

    findById(id) {
        return this.data.find(item => item.id === id);
    }

    update(id, updatedItem) {
        const index = this.data.findIndex(item => item.id === id);
        if (index !== -1) {
            this.data[index] = { ...this.data[index], ...updatedItem };
            this.save();
            return this.data[index];
        }
        return null;
    }

    delete(id) {
        this.data = this.data.filter(item => item.id !== id);
        this.save();
    }

    save() {
        localStorage.setItem("items", JSON.stringify(this.data));
    }
}

const db = new Database();
