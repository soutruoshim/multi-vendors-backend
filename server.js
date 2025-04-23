const express = require('express')
const app = express()
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const CategotyRoute = require("./routes/category")
const RestaurantRoute = require("./routes/restaurant")
const FoodRoute = require("./routes/food")

dotenv.config();

mongoose.connect(process.env.MONGOURL)
.then(() => console.log("Multivendor Database Connected"))
.catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api/category", CategotyRoute);
app.use("/api/restaurant", RestaurantRoute);
app.use("/api/foods", FoodRoute);

app.listen(process.env.PORT || 6013, () => console.log(`Foodly Backend is running on ${process.env.PORT}!`))