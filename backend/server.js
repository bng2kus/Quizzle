//npm run dev
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const setRoutes = require('./routes/sets')

//for CORS
const cors = require('cors');


const corsOptions = {
    //change origins to connect properly
    origin: 'https://profound-macaron-26bbc5.netlify.app/'
  };


//express app
const app = express()

//middleware
app.use(express.json())

// Use the CORS middleware
app.use(cors(corsOptions));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://profound-macaron-26bbc5.netlify.app');
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/sets', setRoutes)


//connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('now with CORS, connected to DB & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
