require("dotenv").config();
const express = require('express')
const app = express()
const port = process.env.PORT || 5000

const mongoose = require("mongoose");
mongoose
    .connect(process.env.MONGOURL)
    .then(() => console.log("Mongo connected!"));

const RegistrationRoutes = require("./Routers/RegistrationRoute");
const WalletRoutes = require("./Routers/WalletRoute");

app.use("/Registration",RegistrationRoutes);
app.use("/Wallet", WalletRoutes);

app.get('/', (req, res) => res.send('Welcome to Wallet Management System!'))
app.listen(port, () => console.log(`WMS app listening on port ${port}!`))