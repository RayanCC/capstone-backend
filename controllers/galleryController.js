const Gallery = require("../models/GalleryModel");
const mongoose = require('mongoose')

//get all items
const getAllItems = async (req, res ) => {
    const items = await Gallery.find({}).sort({createdAt: -1})
    res.status(200).json(items)
}

//get single item
const getItem = async (req, res) => {
          const { id } = req.params 
          if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error:'No such item'})
          }
          
          const item = await Gallery.findById(id)

          if(!item) {
            return res.status(404).json({error:'No such item'})
          }
          res.status(202).json(item)
}

//create new item
const createItem = async (req, res ) => {
    const { name, img } = req.body;
  //add DOC to DB
    try {
      const item = await Gallery.create({ name, img });
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

     const item = await Gallery.findOneAndDelete({_id: id})

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

      const item = await Gallery.findByIdAndUpdate({_id:id}, {
        ...req.body
      })

      if(!item) {
        return res.status(404).json({error:'No such item'})
      }
     res.status(200).json(item)
  }



module.exports = {
    createItem,
    getAllItems,
    getItem,
    deleteItem,
    updateItem,
}