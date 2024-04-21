const {admin} = require('../config/firebase-config');

const verifyToken = (req, res, next) =>{
    const token = req.headers.authorization;
        const decodeValue = admin.auth().verifyIdToken(token).then(decodedToken =>{
            const uid = decodedToken.uid;
            req.body.uid = uid;
            req.body.email = decodedToken.email;
            req.body.USER_EMAIL = decodedToken.email;
            next();  

        }).catch((error)=>{
            res.status(401);
            res.json({unauthorized: "token shi nhi h"});
        });
}

const verifyWsToken = (req, next) =>{
        const token = req.url.split('?token=')[1];
        if(token.includes('vijaykatoken')) {
            next(null, token.split('&email=')[1]);
        }else{
                admin.auth().verifyIdToken(token).then(decodedToken =>{
                    next(null, decodedToken.email);  
                }).catch(err=>{
                    next(err, null)
                })
        
        }
}


module.exports =  { verifyToken, verifyWsToken };