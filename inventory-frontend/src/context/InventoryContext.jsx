import { createContext, useContext, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import * as inventoryService from '../services/inventory.service';

const InventoryContext = createContext(null);

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInventory = useCallback(async () => {
    try {
      setLoading(true);
      const data = await inventoryService.getAllInventory();
      setInventory(data);
    } catch (error) {
      toast.error('Failed to fetch inventory');
      console.error('Error fetching inventory:', error);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array since it doesn't depend on any state/props

  const createItem = async (data) => {
    try {
      await inventoryService.createInventory(data);
      toast.success('Item created successfully');
      await fetchInventory();
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create item');
      return false;
    }
  };

  const updateItem = async (id, data) => {
    try {
      await inventoryService.updateInventory(id, data);
      toast.success('Item updated successfully');
      await fetchInventory();
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update item');
      return false;
    }
  };

  const deleteItem = async (id) => {
    try {
      await inventoryService.deleteInventory(id);
      toast.success('Item deleted successfully');
      await fetchInventory();
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete item');
      return false;
    }
  };

  const value = {
    inventory,
    loading,
    fetchInventory,
    createItem,
    updateItem,
    deleteItem
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryContext; 