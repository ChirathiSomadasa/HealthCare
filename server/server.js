const express = require("express");;
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config()
const dbConfig = require("./config/dbConfig");
var User = require("./models/User");
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/Appointments');
const feedbackRoutes = require('./routes/recordRoutes');


var userRoute = require("./routes/user_route");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Authentication Middleware
app.use(async (req, res, next) => {
    const email = req.body.auth_email;
    const password = req.body.auth_password;

    if (email && password) {
        try {
            const user = await User.findOne({ email: email, password: password });
            if (!user) {
                return res.status(400).json({ status: "invalid_user", message: "This user is invalid." });
            }
            req.current_user = { user_id: user._id, user: user };
            next();
        } catch (error) {
            return res.status(500).json({ error: "Error during authentication" });
        }
    } else {
        req.current_user = null;
        next();
    }
});

// Routes
app.use("/user", userRoute);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/records', feedbackRoutes);




const port = process.env.PORT || 5002;
app.listen(port, () => console.log(`Node server started at port ${port}`));