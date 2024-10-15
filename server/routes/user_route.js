var express = require("express");
var User = require("../models/User");

var router = express.Router();

//login API endpoint
router.route("/login").post((req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email, password: password }).then((doc) => {

        if (doc != null) {

            res.send({ status: "success",
                 email: email,
                  password:password });

        } else {
            //invalid user
            res.send({ status: "invalid_user", "message": "Incorrent email or password." });
        }

    }).catch((e) => {
        res.send({ status: "failed", "message": e});
    });

});

 
//register API endpoint
router.route("/register").post((req, res) => {

    var fullName = req.body.full_name;
    var address = req.body.address;
    var mobileNumber = req.body.mobile_number;
    var email = req.body.email;
    var birthDate = req.body.birthdate;
    var password = req.body.password;

    //validate details
    if (fullName == null || fullName == "" ||
        address == null || address == "" ||
        mobileNumber == null || mobileNumber == "" ||
        email == null || email == "" ||
        birthDate == null || birthDate == "" ||
        password == null || password == "") {

        res.send({ "status": "required_failed", "message": "Please send required details." });

        return;
    }

    //check email is already
    User.findOne({ email: email }).then((doc) => {

        if (doc == null) {

            //save user details
            var user = new User();
            user.full_name = fullName;
            user.address = address;
            user.mobile_number = mobileNumber;
            user.email = email;
            user.birthdate = birthDate;
            user.password = password;

            user.save().then(() => {
                res.send({ "status": "success", "message": "User is register success." });
            }).catch((e) => {
                res.send({ "status": "failed", "message": "Somthing error. Please try again." });
            });

        } else {
            res.send({ "status": "already_email", "message": "This email is already taken." });
        }

    }).catch((e) => {
        res.send({ "status": "failed", "message": "Somthing error. Please try again." });
    });

});

// fetch users for notification system
router.route("/users").get((req, res) => {
    User.find({}).then((users) => {

        console.log(users);
        if (users.length > 0) {
            res.send({ status: "success", users: users });
        } else {
            res.send({ status: "no_users", message: "No users found." });
        }
    }).catch((e) => {
        res.send({ status: "failed", message: "Something went wrong. Please try again." });
    });
});


//get user profile
router.route("/profile").post((req, res) => {

    //check authentication
    if (req.current_user != null) {

        const userId = req.current_user.user_id;
        User.findOne({ _id: userId }).then((result) => {

            var profilePic = null;
            if (result.profile_pic != undefined) {
                profilePic = result.profile_pic;
            }

            res.send({ status: "success", profile_pic: profilePic, mobile_number: result.mobile_number, email: result.email, full_name: result.full_name, address: result.address,birthdate: result.birthdate});
        });

    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }

});


router.route("/edit/avatar").post((req, res) => {

    //check authentication
    if (req.current_user != null) {

        const userId = req.current_user.user_id;
        const image = req.files[0];

        //validate image thumbnail
        if (image == null || image.fieldname != "image") {
            res.send({ status: "required_failed", "message": "Required values are not received." });
            return;
        }

        User.updateOne({ _id: userId }, { profile_pic: image.filename }).then(() => {
            res.send({ status: "success", "message": "Profile picture updated." });
        }).catch((error) => {
            res.send(error);
        });

    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }

});

module.exports = router;