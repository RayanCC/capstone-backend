const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plushSchema = new Schema(
  {
    category: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    img:{
      type:String,
      required: true
    },
    thumb: {
      type:String
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("plush", plushSchema);
