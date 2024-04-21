const UserDb = require('../models/User');
const FreindDb = require('../models/Freind');
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
    },

    addFreind : async (req, res)=>{
        try{
            this.user_controller.addFreindUtils(req.params.freinduid, req.body.uid);
            this.user_controller.addFreindUtils( req.body.uid, req.params.freinduid);
        res.status(200).json({
            success : true
        });
    }catch(err){
        res.status(500).json({
            message : 'INTERNAL SERVER ERROR'
        })
    }
    },


    addFreindUtils : async (myuid, freinduid)=>{

        var freindList = await FreindDb.findOne({ uid: myuid }, {_id:0, freinds : 1});
        const userDetails = await UserDb.findOne({ uid: freinduid }, { username: 1, _id: 0, uid : 1 });
    if(userDetails === null) throw new Error('no user exists');
    if(freindList === null){
        freindList = [];
    }else
        freindList = freindList.freinds;

    freindList.push(userDetails);
    const uniqueUids = {};
    freindList = freindList.filter(obj => {
        if (!uniqueUids[obj.uid]) {
          uniqueUids[obj.uid] = true;
          return true;
        }
        return false;
      });

    await FreindDb.updateOne(
        { uid: myuid }, // Query to find the document to update
        { $set: { freinds : freindList } }, // Update to set the modified uid array
        { upsert: true }
    );
    },

    getFreindList : async (req, res)=>{
        try{
            var freindList = await FreindDb.findOne({ uid: req.body.uid }, {_id:0, freinds : 1, groupchat : 1});
            res.status(200).json(freindList);
        }catch(err){
            res.status(500).json({
                message : "INTERNAL SERVER ERROR"
            })
        }
    },

    addGroupChat : async (req, res)=>{
        try{
            const myuid = req.body.uid;

            var groupChatList = await FreindDb.findOne({ uid:  myuid}, {_id:0, groupchat : 1});
            if(groupChatList === null)
                groupChatList = [];
            else groupChatList = groupChatList.groupchat
            groupChatList.push(req.params.topic)
            groupChatList = Array.from(new Set(groupChatList));
            await FreindDb.updateOne(
                { uid: myuid }, // Query to find the document to update
                { $set: { groupchat : groupChatList } }, // Update to set the modified uid array
                { upsert: true }
            );
            res.status(200).json({
                success : true 
            })
        }catch(err){
            
        }
    },

    saveRepo : async (req, res)=>{
        try{
            var savedRepo = await UserDb.findOne({ email:  req.body.email}, {_id:0, saved_repo : 1});
            if(savedRepo.saved_repo === undefined || savedRepo.saved_repo === null)
                savedRepo = [];
            else 
                savedRepo = savedRepo.saved_repo;
            savedRepo.push(req.body.repo_link);
            savedRepo = Array.from(new Set(savedRepo));
            await UserDb.updateOne(
                {email : req.body.email},
                {$set : {saved_repo : savedRepo}},
                { upsert : true}
            )
            res.status(200).json({
                success : true
            })
        }catch(er){
            res.status(500).json({
                message : "INTERNAL SERVER ERROR"
            })
        }
    }
}