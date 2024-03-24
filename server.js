require('dotenv').config()

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const shopRoutes = require('./routes/shop');
const galleryRoute = require('./routes/gallery');
const userRoutes = require('./routes/user');

const app = express();

app.use(express.json());
app.use(cors());

app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/shop',shopRoutes)
app.use('/gallery', galleryRoute)
app.use('/user', userRoutes)

// connect to DB 
mongoose.connect(process.env.MONG_URI)
.then(() => {
    // listen for request
    app.listen(process.env.PORT,() => {
        console.log('connected to DB & listening on port',process.env.PORT)
    })
    
})
.catch((error) => {
    console.log(error)
})


