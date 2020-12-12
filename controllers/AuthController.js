const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const { check, validationResult} = require("express-validator");

exports.authRegister = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
//  console.log (
//      "Fields:", 
//      firstName,
//      lastName,
//      email,
//      password);
 
 //TODO1: Validate the fields

 const validationErr = validationResult(req);

 if (validationErr.errors.length > 0) {
     return res
     .status(400)
     .json({ errors: validationErr.array()});
 }

 //TODO2: Check already register (email)

 const userData = await User.findOne({ email});

 if (userData) {
    return res
    .status(400)
    .json({errors: [{message: "User already exists!!"}]});
 }


 //TODO3: Crpyt password yaptık
 //TODO4: Save the user to DB yaptk

 const salt = await bcrypt.genSalt(10);

 const newPassword = await bcrypt.hash(password, salt);

    const user = new User({
        firstName,
        lastName,
        email,
        password: newPassword, //crypted password
    });
    await user.save();

    //TODO: Error handling for saving
    res.send("Register Completed");
};


exports.authLogin = (req, res) => {
    //TODO: Auth.
    //TODO: Login Func.
    res.send("Login Completed");
};