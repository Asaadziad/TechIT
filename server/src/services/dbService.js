const mongoose = require("mongoose");

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose.set("strictQuery", false);
  try {
    mongoose.connect(process.env.DB, connectionParams);
    console.log("Connected to DB successfully");
  } catch (err) {
    console.log(err.message);
    console.log("DB Connection Failed");
  }
};
