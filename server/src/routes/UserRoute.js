const express = require('express');
const router = express.Router();
const  UserController  = require('../controller/UserController');
const { verifyToken } = require('../middleware/VerifyToken')


// router.post('/addUser', verifyToken,  UserController.user_controller.post);
// router.post('/addNewUser', UserController.user_controller.postNew);
// router.post('/addNewUser', verifyToken, UserController.user_controller.postNew);

router.get('/userDetail', verifyToken, UserController.user_controller.getMyProfile) //using
router.post('/', verifyToken, UserController.user_controller.postNewUser)
router.get('/getrecommendeduser', verifyToken, UserController.user_controller.getRecommendedUser);
router.get('/getrecommendeduserloggedout', UserController.user_controller.getRecommendedUserForLoggedOutUser)
router.post('/addToChatList/:freinduid', verifyToken, UserController.user_controller.addFreind)
router.post('/addToGroupChatList/:topic', verifyToken, UserController.user_controller.addGroupChat)
router.get('/getFreindList', verifyToken, UserController.user_controller.getFreindList)
router.post('/addSavedRepo', verifyToken, UserController.user_controller.saveRepo);

router.get('/userDetail/:id', UserController.user_controller.getById);



module.exports = router;