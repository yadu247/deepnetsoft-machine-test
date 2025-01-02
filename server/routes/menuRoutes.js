const express = require('express');
const Menu = require('../models/Menu');
const Item = require('../models/Item');
const router = express.Router();

// Create new menu
router.post('/add-menu', async (req, res) => {
  const { name, description } = req.body;

  try {
    const newMenu = new Menu({ name, description });
    await newMenu.save();
    res.status(201).json(newMenu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all menus
router.get('/', async (req, res) => {
  try {
    const menus = await Menu.find();
    res.json(menus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new item in a specific menu
router.post('/:menuId/add-item', async (req, res) => {
  const { menuId } = req.params;
  const { name, description, price } = req.body;

  try {
    const menu = await Menu.findById(menuId);
    if (!menu) return res.status(404).json({ error: 'Menu not found' });

    const newItem = new Item({ name, description, price, menu: menuId });
    await newItem.save();

    menu.items.push(newItem);
    await menu.save();

    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get items for a specific menu
router.get('/:menuId/items', async (req, res) => {
  const { menuId } = req.params;

  try {
    const items = await Item.find({ menu: menuId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
