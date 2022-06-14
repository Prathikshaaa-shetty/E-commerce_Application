const express = require("express");

// get MongoDB driver connection
const dbo = require("./db/connection");
const cors = require("cors");

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(require("./routes/category"));




// perform a database connection when the server starts
dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  // start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });

  
});
