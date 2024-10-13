// const express = require("express");;
// const cors = require("cors");
// const bodyParser = require("body-parser");
// require('dotenv').config()
// const dbConfig = require("./config/dbConfig");
// var User = require("./models/User");

// var userRoute = require("./routes/user_route");

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Authentication Middleware
// app.use(async (req, res, next) => {
//     const email = req.body.auth_email;
//     const password = req.body.auth_password;

//     if (email && password) {
//         try {
//             const user = await User.findOne({ email: email, password: password });
//             if (!user) {
//                 return res.status(400).json({ status: "invalid_user", message: "This user is invalid." });
//             }
//             req.current_user = { user_id: user._id, user: user };
//             next();
//         } catch (error) {
//             return res.status(500).json({ error: "Error during authentication" });
//         }
//     } else {
//         req.current_user = null;
//         next();
//     }
// });

// app.use("/user", userRoute);

// const port = process.env.PORT || 5002;
// app.listen(port, () => console.log(`Node server started at port ${port}`));

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ContactModel = require('./models/Record');



// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

// express app
const app = express();

// middleware
app.use(express.json());

// cors
app.use(cors());

// Routes
app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });


  
// Fetch all contacts
app.get('/', async (req, res) => {
  try {
      const contacts = await ContactModel.find({});
      res.status(200).json(contacts);
  } catch (err) {
      res.status(500).json({ error: 'Error fetching problems' });
  }
});

app.post("/AddProblem", async (req, res) => {
  console.log("Received data:", req.body); // Log the incoming data
  try {
      const newProblem = new ContactModel(req.body);
      await newProblem.save();
      res.status(200).json({ message: 'Problem added successfully!', data: newProblem });
  } catch (err) {
      console.error(err); // Log the error to see the stack trace
      res.status(500).json({ error: 'Error adding problem' });
  }
});





 