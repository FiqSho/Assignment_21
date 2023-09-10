const express = require('express')
const router = require('./src/route/api')
const app= express()
const bodyParser= require('body-parser')
const mongoose  = require('mongoose');
require('dotenv').config();



//Security Midduleware
const helmet=require('helmet')
const rateLimit=require('express-rate-limit')
const mongoSanitize=require('express-mongo-sanitize')
const hpp = require('hpp')
const cors=require('cors');


//Security Midduleware Implement
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(hpp())

// BodyParser 
app.use(bodyParser.json())

//Rate Limiter 
const limiter = rateLimit({windowMs:15*60*100,max:3000})
app.use(limiter)

// Database
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Managing BackEnd API Routing
app.use("/api/v1",router)


module.exports=app