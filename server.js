const express = require('express')
const app = express()
const dotenv = require('dotenv');
const mongoose = require('mongoose');


dotenv.config();

mongoose.connect(process.env.MONGOURL)
.then(() => console.log("Multivendor Database Connected"))
.catch((err) => console.log(err));

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(process.env.PORT || 6013, () => console.log(`Multivendor Backend is running on ${process.env.PORT}!`))