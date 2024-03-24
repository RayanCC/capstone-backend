const Plush = require("../models/PlushModel");
const mongoose = require('mongoose')

//get all items
const getAllItems = async (req, res ) => {
    const items = await Plush.find({}).sort({createdAt: -1})
    res.status(200).json(items)
}

//get single item
const getItem = async (req, res) => {
          const { id } = req.params 
          if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error:'No such item'})
          }
          
          const item = await Plush.findById(id)

          if(!item) {
            return res.status(404).json({error:'No such item'})
          }
          res.status(202).json(item)
}

//create new item
const createItem = async (req, res ) => {
    const { title, name, size, price, img , category, thumb } = req.body;
  //add DOC to DB
    try {
      const item = await Plush.create({ title, name, size, price , img , category, thumb });
      res.status(200).json(item);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

//delete a item
   const deleteItem = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such item'})
      }

     const item = await Plush.findOneAndDelete({_id: id})

     if(!item) {
        return res.status(404).json({error:'No such item'})
      }
     res.status(200).json(item)
   }

//update a item
  const updateItem = async (req, res) => {
    const { id } =req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:'No such item'})
      }

      const item = await Plush.findByIdAndUpdate({_id:id}, {
        ...req.body
      })

      if(!item) {
        return res.status(404).json({error:'No such item'})
      }
     res.status(200).json(item)
  }
//get item by category
  const getItemsByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const items = await Plush.find({ category });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createItem,
    getAllItems,
    getItem,
    deleteItem,
    updateItem,
    getItemsByCategory
}