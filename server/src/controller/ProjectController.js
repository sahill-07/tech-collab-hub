const ProjectDb = require("../models/Project");
const UserDb = require('../models/User');
const express = require('express');

class ProjectController {
  getProjectList(req, res) {
    let pipeline = [
      {$limit : 15}
    ];
    
    ProjectDb.aggregate(pipeline)
      .then((list) => {
        res.status(200).json(list);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          success: false,
        });
      });
  }

  /**
 * Controller to get ProjectList for LoggedInUser
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 */
  async getProjectListForLoggedInUser(req, res){
    // fetch user projetclist and for each id fetch projects 
    try{
      const { email } = req.body;
      const user = await UserDb.findOne({ email }, 'projectList');
      const projectIds = user.projectList.map(projectId => projectId.toString());
      const projects = await ProjectDb.find({ _id: { $in: projectIds } });
      res.status(200).send(projects);
    }catch(err){
      console.log(err);
      res.status(500).json(err.message);
    }
  }
}

module.exports = new ProjectController();
