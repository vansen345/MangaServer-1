const express = require('express');
const middleware = require('../controllers/middlewareController');
const router = express.Router()
const UserController = require('../controllers/userController')
const {validateBody,validateParam,schemas}=require('../helpers/routerHelper')
// const passport = require('passport')
// const passConfig = require('../middlewares/passport')

// router.route('/')
router.get("/layuser",middleware.verifyToken,UserController.index);

router.post("/themuser",validateBody(schemas.userSchema),UserController.CreatUser);

//sign in , sign up

router.post('/signin',validateBody(schemas.SingninSchema),UserController.Signin);

router.post('/signup',validateBody(schemas.SignupSchema),UserController.Signup);

//  router.post("/login",UserController.Loginuser);

router.get("/:userID",validateParam(schemas.idSchema,'userID'),UserController.getID)

router.put("/:userID",validateParam(schemas.idSchema,'userID'),validateBody(schemas.userSchema),UserController.replaceUser)

router.patch("/:userID",validateParam(schemas.idSchema,'userID'),validateBody(schemas.userUpdateSchema),UserController.updateUser)

router.delete("/:userID",UserController.deleteUser)







 module.exports = router