import Inventory from '../models/inventory.model.js';

export const getAllInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findAll();
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inventory', error: error.message });
  }
};

export const createInventory = async (req, res) => {
  try {
    const { name, quantity, price } = req.body;
    const inventory = await Inventory.create({
      name,
      quantity,
      price,
    });
    res.status(201).json(inventory);
  } catch (error) {
    res.status(500).json({ message: 'Error creating inventory item', error: error.message });
  }
};

export const updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, price } = req.body;

    const inventory = await Inventory.findByPk(id);
    if (!inventory) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    await inventory.update({
      name,
      quantity,
      price,
    });

    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: 'Error updating inventory item', error: error.message });
  }
};

export const deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;
    
    const inventory = await Inventory.findByPk(id);
    if (!inventory) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    await inventory.destroy();
    res.json({ message: 'Inventory item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting inventory item', error: error.message });
  }
}; 