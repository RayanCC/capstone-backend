const express = require("express");
const router = express.Router();
const {
    createItem,
    getAllItems,
    getItem,
    deleteItem,
    updateItem,
    getItemsByCategory
} = require('../controllers/shopController')

//Get all items
router.get("/", getAllItems);

router.get("/:id/:category", getItemsByCategory);

//Get Single item
router.get("/:id", getItem);

//Post a new item
router.post("/",  createItem);

//Delete a item
router.delete("/:id", deleteItem);

//Update a item
router.patch("/:id", updateItem);

module.exports = router;
