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
      .get('https://deepnetsoft-machine-test-backend.onrender.com/api/menu')
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
        .get(
          `https://deepnetsoft-machine-test-backend.onrender.com/api/menu/${selectedCategoryId}/items`
        )
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
        .post(
          'https://deepnetsoft-machine-test-backend.onrender.com/api/menu/add-menu',
          {
            name: newCategoryName,
            description: newCategoryDescription,
          }
        )
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
        .post(
          `https://deepnetsoft-machine-test-backend.onrender.com/api/menu/${selectedCategoryId}/add-item`,
          {
            name: newItemName,
            description: newItemDescription,
            price: newItemPrice,
          }
        )
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
    <div className="">
      <div className="text-center h-72 flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 bg-[url('./menu-head-bg.png')] bg-cover bg-top"></div>
        <div className="absolute inset-0 bg-black bg-opacity-65"></div>
        <div className="relative z-10 text-white flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold text-footerBorder">MENU</h1>
          <p className="text-menuPara mt-4 font-kellyslab lg:w-[60%] px-8">
            Please take a look at our menu featuring food, drinks, and brunch.
            If you'd like to place an order, use the "Order Online" button
            located below the menu.
          </p>
        </div>
      </div>

      <div className="relative bg-[url('./categories-bg.png')] bg-contain bg-center h-auto">
        <div className="absolute inset-0 bg-black bg-opacity-90"></div>
        <div className="relative flex space-x-2 overflow-x-auto justify-center p-10">
          {categories.map(category => (
            <div
              key={category.name}
              className={`border border-navbarActive  cursor-pointer flex flex-col items-center justify-center min-w-24 p-8 h-12
        ${
          selectedCategory === category.name
            ? 'bg-navbarActive text-white'
            : 'bg-black text-white'
        }`}
              onClick={() => {
                setSelectedCategory(category.name);
                setSelectedCategoryId(category._id);
              }}
            >
              <h2 className="text-xl font-semibold">{category.name}</h2>
            </div>
          ))}

          <button
            className="border-2 border-navbarActive rounded-md p-8 flex justify-center items-center text-navbarActive w-12 h-12 text-4xl"
            onClick={openModal}
          >
            +
          </button>
        </div>
      </div>

      {selectedCategory && (
        <div className="relative p-4">
          <div className="absolute inset-0 bg-[url('./menu-bg.png')] bg-no-repeat bg-cover bg-center before:absolute before:inset-0 before:bg-black before:opacity-80"></div>
          <div className="lg:p-32 md:p-12 sm:p-8">
            <div className="relative border border-white lg:p-12 md:p-8 sm:p-4">
              <img
                src="./menu-juice-1.png"
                alt="Top-left decoration"
                className="absolute -top-8 -left-8 w-40 h-40 object-contain"
              />
              <img
                src="./menu-juice-2.png"
                alt="Bottom-right decoration"
                className="absolute -bottom-8 -right-2 w-40 h-40"
              />
              <h2 className="text-5xl mb-6 text-center font-bold text-white">
                {selectedCategory}
              </h2>
              <div className="mb-6 flex justify-center">
                <button
                  className="bg-navbarActive text-white px-6 py-2 rounded-md"
                  onClick={openItemModal}
                >
                  + Add Item
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 p-10">
                {items[selectedCategory]?.map((item, index) => (
                  <div key={index} className=" p-2 shadow-md ">
                    <div className="flex justify-between">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {item.name}
                      </h3>
                      <p className="text-white font-semibold">${item.price}</p>
                    </div>
                    <p className="text-xs text-white mb-4 font-kellyslab break-words">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {modalOpen && (
        <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
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
        <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
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
