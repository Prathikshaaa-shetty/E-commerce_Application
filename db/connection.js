const { MongoClient } = require("mongodb");

const connectionString = "mongodb://localhost:27017/Category";
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }
      dbConnection = db.db("Category");
      console.log("Successfully connected to MongoDB.");
      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },

};
