const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const { check, validationResult} = require("express-validator");
var jwt = require("jsonwebtoken");

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

 if (validationErr?.errors?.length > 0) {
     return res.status(400).json({ errors: validationErr.array() });
 }

 //TODO2: Check already register (email)

 const userData = await User.findOne({ email});

 if (userData) {
    return res
    .status(400)
    .json({errors: [{message: "User already exists!!"}] });
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


exports.authLogin = async (req, res) => {
    const { email, password } = req.body;
 //TODO1: field validation 

    const validationErr = validationResult(req);
    if (validationErr?.errors?.length > 0) {
     return res.status(400).json({ errors: validationErr.array() });
 }

 //TODO2: user exist check

 const userData = await User.findOne({ email });

 if (!userData) {
    return res
    .status(400)
    .json({ errors: [{message: "User doesn't exists!!"}] });
 }

    //TODO3: password compare

const isPasswordMatch = await bcrypt.compare(password, userData.password);
if (!isPasswordMatch) {
    return res
    .status(400)
    .json({ errors: [{message: "Invalid credentials"}] });
}
    //TODO4: autentication return token JSON WEB TOKEN - JWT
jwt.sign(
    {userData}, 
    process.env.JWT_SECRET_KEY, 
    { expiresIN: 3600 }, 
    (err, token) => {
        if (err) {
            return res
            .status(400)
            .json({errors: [{message: "Unknown Error"}] });
        }
        res.send(token);
        }
    );
    res.send("Login Completed");
};