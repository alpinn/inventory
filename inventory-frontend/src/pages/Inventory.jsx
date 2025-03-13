import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Card, Input, Modal, ConfirmModal } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { useInventory } from '../context/InventoryContext';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  quantity: yup.number().required('Quantity is required').min(0, 'Quantity must be positive'),
  price: yup.number().required('Price is required').min(0, 'Price must be positive'),
});

const Inventory = () => {
  const { user, isAdmin, logout } = useAuth();
  const { 
    inventory, 
    loading, 
    fetchInventory, 
    createItem, 
    updateItem, 
    deleteItem 
  } = useInventory();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleOpenModal = (item = null) => {
    setSelectedItem(item);
    if (item) {
      reset(item);
    } else {
      reset({
        name: '',
        quantity: '',
        price: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    reset();
  };

  const onSubmit = async (data) => {
    try {
      if (selectedItem) {
        await updateItem(selectedItem.id, data);
      } else {
        await createItem(data);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;
    
    try {
      setIsDeleting(true);
      await deleteItem(itemToDelete.id);
    } catch (error) {
      console.error('Error deleting item:', error);
    } finally {
      setIsDeleting(false);
      setDeleteConfirmOpen(false);
      setItemToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 sm:h-24 sm:w-24 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Inventory Management</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Welcome, {user?.username}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
            {isAdmin && (
              <Button 
                onClick={() => handleOpenModal()} 
                variant="primary"
                className="w-full sm:w-auto text-sm sm:text-base"
              >
                Add New Item
              </Button>
            )}
            <Button 
              onClick={logout} 
              variant="secondary"
              className="w-full sm:w-auto text-sm sm:text-base"
            >
              Logout
            </Button>
          </div>
        </div>

        {inventory.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm sm:text-base">No items in inventory</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {inventory.map((item) => (
              <Card key={item.id} className="p-4 sm:p-6">
                <div className="flex flex-col h-full">
                  <div className="flex-grow">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-sm sm:text-base text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-sm sm:text-base text-gray-600">Price: Rp. {item.price.toLocaleString()}</p>
                  </div>
                  {isAdmin && (
                    <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                      <Button
                        onClick={() => handleOpenModal(item)}
                        variant="secondary"
                        size="sm"
                        className="flex-1 text-xs sm:text-sm"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDeleteClick(item)}
                        variant="danger"
                        size="sm"
                        className="flex-1 text-xs sm:text-sm"
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={selectedItem ? 'Edit Item' : 'Add New Item'}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Name"
              {...register('name')}
              error={errors.name?.message}
              className="text-sm sm:text-base"
            />
            <Input
              label="Quantity"
              type="number"
              {...register('quantity')}
              error={errors.quantity?.message}
              className="text-sm sm:text-base"
            />
            <Input
              label="Price"
              type="number"
              step="0.01"
              {...register('price')}
              error={errors.price?.message}
              className="text-sm sm:text-base"
            />
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 mt-6">
              <Button 
                type="button" 
                variant="secondary" 
                onClick={handleCloseModal}
                className="w-full sm:w-auto text-sm sm:text-base"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="primary"
                className="w-full sm:w-auto text-sm sm:text-base"
              >
                {selectedItem ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </Modal>

        <ConfirmModal
          isOpen={deleteConfirmOpen}
          onClose={() => {
            setDeleteConfirmOpen(false);
            setItemToDelete(null);
          }}
          onConfirm={handleDeleteConfirm}
          title="Delete Item"
          message={`Are you sure you want to delete "${itemToDelete?.name}"?`}
          confirmText="Delete"
          cancelText="Cancel"
          isLoading={isDeleting}
        />
      </div>
    </div>
  );
};

export default Inventory; 