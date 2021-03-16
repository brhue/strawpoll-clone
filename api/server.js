const express = require("express");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/polldb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to DB successfully.");
  })
  .catch((err) => {
    console.error(`There was an error connecting to the DB: ${err}`);
    process.exit(1);
  });

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", require("./routes"));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
