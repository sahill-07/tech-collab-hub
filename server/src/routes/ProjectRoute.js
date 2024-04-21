const express = require('express')
const { verifyToken } = require('../middleware/VerifyToken')

//import homeController
const project_controller = require('../controller/ProjectController') 
const router = express.Router(); // New router instance from express library

//routes
router.get("/projectlist/all", project_controller.getProjectList);
router.get("/projectlist", verifyToken, project_controller.getProjectListForLoggedInUser);
// router.get('/projectid/:id', project_controller.getProjectById);
// router.post('/addproject', verifyToken, project_controller.postProject);
// router.get('/getfilter', project_controller.getFilters);

module.exports = router
