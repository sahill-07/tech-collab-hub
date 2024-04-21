const UserDb = require('../models/User');
const UserDbService = require('../services/UserDbService');

exports.user_controller = {

    postNewUser : async (req, res)=>{
        try{
            await UserDbService.addNewUser(res, req.body.email, req.body);
        }catch(err){
            res.status(500).json(err.message)
            console.log(`Encoutered Error with message ${err.message}`);
        }
    },

    getById : (req, res)=>{
        const id = req.params.id;
        UserDb.findById(id).then(list=>{
            res.status(200).json(list);
        }).catch(err=>{
            console.log(err);
            res.status(400).json({
                success: false
            })
        })
    },

    getMyProfile : async (req, res)=>{
        try{
            const email = req.body.email;
            const details = await UserDb.findOne({email: email});
            res.status(200).json(details);
        }catch(err){
            res.status(500).json({
                success: false
            })
        }
    },

    getRecommendedUser : async (req, res)=>{
        try{
            const email = req.body.email;
            const details = await UserDb.findOne({ email: email }, { knn: 1, _id: 0 });
            const knn = details.knn;
            const pipeline = [
                { $match: { email: { $in: knn } } },
                { $project: { knn: 0, generated_tags : 0 } },
            ]
            const userdetails = await UserDb.aggregate(pipeline);
            const finalknn = [];
            if(userdetails.length > 0){
                for(let email of knn){
                    for(let userdetail of userdetails){
                        if(userdetail.email === email)
                            finalknn.push(userdetail)
                    }
                }
            }
            res.status(200).json(finalknn);
        }catch(err){
            res.status(500).json({
                success: false
            })
        }
    },

    getRecommendedUserForLoggedOutUser : async (req, res)=>{
        try{
            let pipeline = [
                {$limit : 15}
              ];
              
              UserDb.aggregate(pipeline)
                .then((list) => {
                  res.status(200).json(list);
                })
                .catch((err) => {
                  console.log(err);
                  res.status(500).json({
                    success: false,
                  });
                });
        }catch(err){
            res.status(500).json({
                message : err.message
            })
        }
    }
}