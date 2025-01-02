import { useState, useEffect } from 'react';
import axios from 'axios';

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');

  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

  const [items, setItems] = useState({});

  useEffect(() => {
    axios
      .get('https://deepnetsoft-machine-test-backend.onrender.com/api/menu')
      .then(response => {
        setCategories(response.data);
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

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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

  const openItemModal = () => {
    setItemModalOpen(true);
  };

  const closeItemModal = () => {
    setItemModalOpen(false);
  };

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
        <div className="absolute inset-0 bg-[url('https://s3-alpha-sig.figma.com/img/aefd/7aa0/f81b6208cb3da0f5ecc0f0d109ca4bd0?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZeKHm22hElWdMf84VmnZbIdwhYXQ9sKXSQ0Gz0c22AgjC2lsY3ZtEW2KSzEOvkRwTrHfzkX6WSNl~Ji2CySb6Bkdu~DCmkg0tR72ISS-my04KshYLKOHdwxzeVD64rP7pVqMKmGo557fkvDLd5cndy-Qq4HtVbD10yNF~F0Pv4Zn3ozepMOGlJD6UyUdCDHGfSkiPKfhgFPfM0RdGNRI-AbVqtbUhxm7c~K1hALNzareXxwMjCWrAKGqTze4YhZ4M7WoThL5bmkPwgh-5iHbN7svsFBKon2b0Ueh01TVfh1GYdZWmRBlt0Ad-0BlpsYEgUbAIDX-T4bOh8GIpiWMdw__')] bg-cover bg-top"></div>
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

      <div className="relative bg-[url('https://s3-alpha-sig.figma.com/img/0571/aff9/d875fd6fec8f3801ba095cc39be0e4b1?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RFxLpkEjoVAaVTqtbYQ6wCIrA6xu5Su4oaxaoU4fJXge9N0oT5bfhXf1MvvYyEQKDDglsuCzYjW5UH11gUKShNqp0lx2KqvyRyo7tcQ-UVU9aTd2V8VYR~TT-Bedh6cVgRzyk0b08d~vnAymLEUHwTe29hrgkmqdPUaNYGA9bZLf~vWpJdktWALZ7Rqy30ri3KbMzBJe9nS9zY0dhrPpZn-iojkhXLUAleFXqJ2Q7K4BX-FkenzVxoWVW-5Ig79YAfzOl1XCnnmgR3iGKKTuZrDcAHWqe-BspqDDRhXcEKwSKHRusOF6pFsUJUTFjMA0OrcDjHm~BGtN3WyLNzCJkQ__')] bg-contain bg-center h-auto">
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
          <div className="absolute inset-0 bg-[url('https://s3-alpha-sig.figma.com/img/53f3/e533/f37f4a258b3eea846bf145fb95b71dfd?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nRgw8sxp~UhdifTgFxtcrlhGW3pjYBmbnQReM~vBmwT8Ueg~mQOA0RNMuWR8MywmwEcsfz6LTc7VUpvkoamBx3CvWZ-sg8q~q0Mgog-R48YOgPuxRCVKUmK8qJ6fwOREuBM2n0hbG0HMUA5v12a~ZEI0Ysx~Nc0jhJC-oFfVu9Bdgj3mWodm65Kh40AMwDBwdAX9eVMprf-7q4V6tTkrk6VhQDTYc4ZFdZ70UlIXzS4KghPlPyEp5j9vSEbGz81CR29ow24Hks3o-jEiFtSOBr6cvLP~IiYmvkLnwi~MDlP-JpsaQiZKth-YqA5vf3E5jcrW8dlVPvqE14B0DTN8QA__')] bg-no-repeat bg-cover bg-center before:absolute before:inset-0 before:bg-black before:opacity-80"></div>
          <div className="lg:p-32 md:p-12 sm:p-8">
            <div className="relative border border-white lg:p-12 md:p-8 sm:p-4">
              <img
                src="https://s3-alpha-sig.figma.com/img/08f1/ba92/09e436820849a421ec0b1fe5126bf9b5?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qvOq7OcG7YwIPJNlFbFB3y6vjgh3b1ytbdNuPQLw-x3HnXoAVXRVWdrWeTnYFyyxQDF0r8XD1n~EZblmk3moMwVN205oycp~2KM4lLCsilx9NElDgJLWsEdBm4a0sA9gjjnBo413ixA-I~~1Ogo10apbZZWPUqRdjoMsozb8wHTW3oIDCx-i5eXyAOMpf~OuDurY8TsCSoAyMoeIY5w865hc9usKFD8hsrTeyf7EAp~VJ2FtT2OrP2fgJXodSSRh9mYLuA8JpOeFpSP2yTMfa8io4ggxn15Xc22dq0ZlaLlsCxyN9jbYd-7TNS8pwnQ-VTOXJkoP0DrJH6Nbt6UPag__"
                alt="Top-left decoration"
                className="absolute -top-8 -left-8 w-40 h-40 object-contain"
              />
              <img
                src="https://s3-alpha-sig.figma.com/img/6b91/b238/f07a69022d4c64e313237eadaceb997f?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YG1FYzxRykOuaKV2-SvezP7g9vWy6da6y0pSazPtWBcQKcIP860XEQx9WOOk6yH6isJSNgl3cHFosz4SoPNXeMcD2y-9qn87YpnaXuPqzSYNBtgV5CEtIj8vjZMAKiqjAgkLKEk~5PKGVZV40aXecGz1vWC6DlmzyT28z-yr~sqx~dT~jJW15LHGt-gFIwLvASlGKhLz4Tb58-sqmL0LkseU0-8-VE9RyL0F6eUNFH16ZOnW~EDTH4ywvriTf1kKeo4dvb10X~CaYBFD8S2n6JNCtkjwAW4G--gpzKfDoYczZd9neLGrcOLRO6q6SbAyn4OB3bK44jkopBhija-7EA__"
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
                  <div key={index} className=" p-2">
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
