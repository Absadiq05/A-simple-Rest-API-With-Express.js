// data.js

let items = [{
    id: '1',
    name: 'Laptop',
    description: 'A powerful computing device.'
}, {
    id: '2',
    name: 'Mouse',
    description: 'A peripheral for computer navigation.'
}, {
    id: '3',
    name: 'Keyboard',
    description: 'An input device for typing.'
}, ];

const generateId = () => {
    // A simple ID generator for in-memory store
    return Math.random().toString(36).substring(2, 9);
};

const getAllItems = () => {
    return items;
};

const getItemById = (id) => {
    return items.find(item => item.id === id);
};

const createItem = (newItemData) => {
    const newItem = {
        id: generateId(),
        ...newItemData
    };
    items.push(newItem);
    return newItem;
};

const updateItem = (id, updateData) => {
    const itemIndex = items.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        items[itemIndex] = {
            ...items[itemIndex],
            ...updateData,
            id: id // Ensure ID remains the same
        };
        return items[itemIndex];
    }
    return null; // Item not found
};

const deleteItem = (id) => {
    const initialLength = items.length;
    items = items.filter(item => item.id !== id);
    return items.length < initialLength; // True if an item was removed
};

module.exports = {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
};
