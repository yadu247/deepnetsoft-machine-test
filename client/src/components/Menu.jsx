import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Menu = () => {
  // State for categories
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');

  // State for item modal
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

  // State for items in each category
  const [items, setItems] = useState({});

  // Fetch categories and items when the page loads
  useEffect(() => {
    // Fetch categories from the backend
    axios
      .get('http://localhost:5000/api/menu')
      .then(response => {
        setCategories(response.data);
        // Fetch items for each category
        const initialItems = {};
        response.data.forEach(category => {
          initialItems[category.name] = [];
        });
        setItems(initialItems);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  // Fetch items when a category is selected
  useEffect(() => {
    if (selectedCategory) {
      axios
        .get(`http://localhost:5000/api/menu/${selectedCategoryId}/items`)
        .then(response => {
          setItems(prevItems => ({
            ...prevItems,
            [selectedCategory]: response.data,
          }));
        })
        .catch(error => {
          console.error(`Error fetching items for ${selectedCategory}:`, error);
        });
    }
  }, [selectedCategory]);

  // Function to open modal for category
  const openModal = () => {
    setModalOpen(true);
  };

  // Function to close modal for category
  const closeModal = () => {
    setModalOpen(false);
  };

  // Function to add a new category
  const addCategory = () => {
    if (newCategoryName && newCategoryDescription) {
      axios
        .post('http://localhost:5000/api/menu/add-menu', {
          name: newCategoryName,
          description: newCategoryDescription,
        })
        .then(response => {
          setCategories([...categories, response.data]);
          setItems({ ...items, [newCategoryName]: [] });
          setNewCategoryName('');
          setNewCategoryDescription('');
          closeModal();
        })
        .catch(error => {
          console.error('Error adding category:', error);
        });
    }
  };

  // Function to open item modal
  const openItemModal = () => {
    setItemModalOpen(true);
  };

  // Function to close item modal
  const closeItemModal = () => {
    setItemModalOpen(false);
  };

  // Function to add an item to a selected category
  const addItem = () => {
    if (newItemName && newItemDescription && newItemPrice) {
      axios
        .post(`http://localhost:5000/api/menu/${selectedCategoryId}/add-item`, {
          name: newItemName,
          description: newItemDescription,
          price: newItemPrice,
        })
        .then(response => {
          setItems({
            ...items,
            [selectedCategory]: [...items[selectedCategory], response.data],
          });
          setNewItemName('');
          setNewItemDescription('');
          setNewItemPrice('');
          closeItemModal();
        })
        .catch(error => {
          console.error('Error adding item:', error);
        });
    }
  };

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">MENU</h1>
        <p className="text-gray-600 mt-4">
          Explore the foods under each category
        </p>
      </div>

      <div className="flex space-x-6 mb-8 overflow-x-auto">
        {categories.map(category => (
          <div
            key={category.name}
            className="border rounded-md p-4 cursor-pointer hover:bg-gray-100"
            onClick={() => {
              setSelectedCategory(category.name);
              setSelectedCategoryId(category._id);
            }}
          >
            <h2 className="text-xl font-semibold">{category.name}</h2>
            <p className="text-gray-500 text-sm">{category.description}</p>
          </div>
        ))}

        <button
          className="border-2 border-blue-500 rounded-md p-4 flex justify-center items-center text-blue-500"
          onClick={openModal}
        >
          + Add Category
        </button>
      </div>

      {selectedCategory && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            {selectedCategory} Items
          </h2>

          <div className="mb-4">
            <button
              className="bg-green-500 text-white p-2 rounded-md"
              onClick={openItemModal}
            >
              + Add Item
            </button>
          </div>

          <div>
            {items[selectedCategory]?.map((item, index) => (
              <div key={index} className="border-b py-4">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                <p className="text-gray-500">Price: ${item.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-96">
            <h3 className="text-xl font-semibold mb-4">Add New Category</h3>
            <input
              type="text"
              placeholder="Menu Name"
              className="w-full p-2 border rounded-md mb-4"
              value={newCategoryName}
              onChange={e => setNewCategoryName(e.target.value)}
            />
            <textarea
              placeholder="Menu Description"
              className="w-full p-2 border rounded-md mb-4"
              value={newCategoryDescription}
              onChange={e => setNewCategoryDescription(e.target.value)}
            />
            <div className="flex justify-between">
              <button
                className="bg-blue-500 text-white p-2 rounded-md"
                onClick={addCategory}
              >
                Add Category
              </button>
              <button
                className="bg-gray-500 text-white p-2 rounded-md"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {itemModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-96">
            <h3 className="text-xl font-semibold mb-4">
              Add New Item to {selectedCategory}
            </h3>
            <input
              type="text"
              placeholder="Item Name"
              className="w-full p-2 border rounded-md mb-4"
              value={newItemName}
              onChange={e => setNewItemName(e.target.value)}
            />
            <textarea
              placeholder="Item Description"
              className="w-full p-2 border rounded-md mb-4"
              value={newItemDescription}
              onChange={e => setNewItemDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Item Price"
              className="w-full p-2 border rounded-md mb-4"
              value={newItemPrice}
              onChange={e => setNewItemPrice(e.target.value)}
            />
            <div className="flex justify-between">
              <button
                className="bg-blue-500 text-white p-2 rounded-md"
                onClick={addItem}
              >
                Add Item
              </button>
              <button
                className="bg-gray-500 text-white p-2 rounded-md"
                onClick={closeItemModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
