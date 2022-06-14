const express = require("express");
const { mongo } = require("mongoose");
const { check, validationResult } = require("express-validator");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /products.
const recordRoutes = express.Router();

const dbo = require("../db/connection");
const nodemailer = require("nodemailer");

recordRoutes.route("/products").get(async function (_req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("Products")
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching products!");
      } else {
        res.json(result);
      }
    });
});

recordRoutes.route("/cart").get(async function (_req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection("Cart")
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching cart!");
      } else {
        res.json(result);
      }
    });
});

recordRoutes.route("/cart").post(async function (req, res) {
  const dbConnect = dbo.getDb();
  const cartRecordId = req.body.id;

  const matchDocument = {
    id: req.body.id,
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    image: req.body.image,
    rating: req.body.rating,
    quantity: req.body.quantity || 0,
  };

  dbConnect.collection("Cart").findOne({ id: req.body.id }, (err, result) => {
    if (err) {
      res.status(400).send("Error inserting cart!");
    } else {
      if (!result) {
        dbConnect
          .collection("Cart")
          .insertOne(matchDocument, function (err, result) {
            if (err) {
              res.status(400).send("Error inserting cart!");
            } else {
              console.log(
                `Added a new product to the cart with id ${result.insertedId}`
              );
              res.status(204).send();
            }
          });
      } else if (result && result.id === cartRecordId) {
        dbConnect
          .collection("Cart")
          .updateOne(
            { _id: result._id },
            { $set: matchDocument },
            function (err, result) {
              if (err) {
                res.status(400).send("Error inserting cart!");
              } else {
                console.log(`Quantity changed`);
                res.status(204).send();
              }
            }
          );
      } else {
        res.status(400).send("Error inserting cart!");
      }
    }
  });
});

recordRoutes.route("/cart/:id").delete((req, res) => {
  const dbConnect = dbo.getDb();
  const cartQuery = { id: parseInt(req.params.id) };
  dbConnect.collection("Cart").deleteOne(cartQuery, function (err, _result) {
    if (err) {
      res.status(400).send(`Error deleting cart with id ${cartQuery.id}!`);
    } else {
      console.log("1 product deleted from the cart");
      res.status(204).send(); //no content error
    }
  });
});

recordRoutes.route("/cart/").delete((req, res) => {
  const dbConnect = dbo.getDb();

  dbConnect.collection("Cart").drop(function (err, _result) {
    if (err) {
      res.status(400).send(`Error deleting cart with id ${cartQuery.id}!`);
    } else {
      console.log("All the products deleted from the cart");
      res.status(204).send();
    }
  });
});

recordRoutes.get("/products/:category", async (req, res) => {
  const category = req.params.category;
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("Products")
    .find({ category })
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching products!");
      } else {
        res.json(result);
      }
    });
});

//For emailjs

recordRoutes.route("/sendInvoice").post(async function (req, res) {
  const dbConnect = dbo.getDb();
  const sendInvoice = req.body;
//changes in collection name
  dbConnect.collection("CartItems").insertOne(sendInvoice, (err, result) => {
    if (err) {
      res.status(400).send("Error  sending Invoice");
    } else {
      console.log("Invoice successfully sent", sendInvoice);
      res.status(204).send();
    }
  });
});

recordRoutes.get("/sendInvoice", async (req, res) => {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("CartItems")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching products!");
      } else {
        res.json(result);
      }
    });
});

// recordRoutes.route("/userList").post(async function (req, res) {
//   const dbConnect = dbo.getDb();
//   // const cartRecordId = req.body.id;
//   // let flag = true;
//   const matchDocument = {
//     // id: req.body.id,
//     email: req.body.email_Id,
//     password: req.body.password,
//     mobile: req.body.mobile,
//     gender: req.body.gender,
//   };

//   // //  VALIDATED THE INPUT
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     return res.status(400).json({
//       errors: errors.array(),
//     });
//   }

//   dbConnect
//     .collection("userList")
//     .find({})
//     .toArray(function (err, result) {
//       if (err) {
//         res.status(400).send("Error fetching users!");
//       } else {
//         // if (result) {
//         console.log(result, "its a result");
//         result.forEach((x) => {
//           if (x.email == matchDocument.email_Id) {
//             // flag = false;
//             return res.status(400).json({
//               errors: [
//                 {
//                   msg: "User already exists",
//                 },
//               ],
//             });
//           }
//         });

//           dbConnect
//             .collection("userList")
//             .insertOne(matchDocument, function (err, result) {
//               if (err) {
//                 res.status(400).send("Error inserting user!");
//               } else {
//                 console.log(`Added a new user`);
//                 // res.status(204).send();
//               }
//             });

//         res.json(result);
//       }
//     });
// });

recordRoutes.route("/userList").post(async function (req, res) {
  const dbConnect = dbo.getDb();
  const userRecordMail = req.body.email_Id;

  const matchDocument = {
    // id: req.body.id,
    email: req.body.email_Id,
    password: req.body.password,
    mobile: req.body.mobile,
    gender: req.body.gender,
  };

  dbConnect
    .collection("userList")
    .findOne({ email: req.body.email_Id }, (err, result) => {
      if (err) {
        res.status(400).send("Error inserting user!");
      } else {
        if (!result) {
          dbConnect
            .collection("userList")
            .insertOne(matchDocument, function (err, result) {
              if (err) {
                res.status(400).send("Error inserting cart!");
              } else {
                console.log(`Added a new  user `);
                res.status(204).send();
              }
            });
        } else if (result && result.email === userRecordMail) {
          dbConnect
            .collection("userList")
            .updateOne(
              { _id: result._id },
              { $set: matchDocument },
              function (err, result) {
                if (err) {
                  res.status(400).send("Error inserting user!");
                } else {
                  console.log(`User already exists`);
                  res.status(204).send();
                }
              }
            );
        } else {
          res.status(400).send("Error inserting user!");
        }
      }
    });
});

recordRoutes.get("/userList", async (req, res) => {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("userList")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching users!");
      } else {
        res.json(result);
      }
    });
});


module.exports = recordRoutes;
