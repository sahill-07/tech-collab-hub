const express = require('express');
const router = express.Router();
const  UserController  = require('../controller/UserController');
const { verifyToken } = require('../middleware/VerifyToken')


// router.post('/addUser', verifyToken,  UserController.user_controller.post);
// router.post('/addNewUser', UserController.user_controller.postNew);
// router.post('/addNewUser', verifyToken, UserController.user_controller.postNew);

router.get('/userDetail', verifyToken, UserController.user_controller.getMyProfile) //using
router.get('/getrecommendeduser', verifyToken, UserController.user_controller.getRecommendedUser);
router.get('/userDetail/:id', UserController.user_controller.getById);



module.exports = router;