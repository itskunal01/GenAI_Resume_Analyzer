const {Router} = require("express");
const authController = require("./../controllers/auth.controller");
const authMiddleware = require("./../middlewares/auth.middleware");


const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @abstract Public
 */

authRouter.post("/register",authController.registerUserController);

/**
 * @route POST /api/auth/login
 * @description login a user with email and password
 * @access Public
 */

authRouter.post("/login",authController.loginUserController);

/**
 * @route GET /api/auth/logout
 * @description clear token from user cookies and add token to blacklist
 * @access Public
 */
 
authRouter.get("/logout",authController.logoutUserController);
 

/**
 * @route GET /api/auth/get-me
 * @description get the logged in user details 
 * @access private
 */

authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController);

module.exports=authRouter