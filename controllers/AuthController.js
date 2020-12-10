

exports.authRegister = (req, res) => {
 const { firstName, lastName, email, password } = req.body;
 console.log (
     "Fields:", 
     firstName,
     lastName,
     email,
     password);
 
 //TODO1: Validate the fields
 //TODO2: Check already register
 //TODO3: Crpyt password
 //TODO4: Save the user to DB




    res.send("Register Completed");
};


exports.authLogin = (req, res) => {
    //TODO: Auth.
    //TODO: Login Func.
    res.send("Login Completed");
}