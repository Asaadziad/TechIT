const express = require("express");
require("dotenv").config();
const app = express();

const userRoutes = require("./src/routes/userRoute");
const productRoute = require("./src/routes/productsRoute");
const connection = require("./src/services/dbService");

//MongoDB connection
connection();

//middlewares
app.use(express.json());

//routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoute);

const port = process.env.SERVER_PORT || 6001;

app.listen(port, () => console.log(`Server is listening on port ${port}`));
