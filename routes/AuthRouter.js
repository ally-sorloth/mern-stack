const express = require("express");
const { check, validationResult } = require("express-validator");

const router = express.Router();

const AuthController = require("../controllers/AuthController");

// router for /api/auth

/**
 * @route POST /api/auth/register
 * @desc Register endpoint
 * @access Public
*/

router.post("/register", 
    [check1 = check("password", "Please enter a password with 6 and more chars").isLength(
            {
            min: 6,
        }
      ),
    ],
    
        AuthController.authRegister);

/**
 * @route POST /api/auth/login
 * @desc Login endpoint
 * @access Private 
 */
router.post("/login", AuthController.authLogin);






module.exports = router;