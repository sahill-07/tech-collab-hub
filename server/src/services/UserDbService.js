const { default: axios } = require('axios');
const User = require('../models/User');
const { response } = require('express');
const natural = require('natural');
const { Matrix } = require('ml-matrix');

class UserDbService {
    static async addUserToDb(data){
        const result = await User.find({USER_EMAIL: data.email});
        let user = {
            USER_EMAIL : data.email,
            USER_NAME : data.USER_NAME,
        };
        if(data.REPOSITORIES)
            user = {...user, REPOSITORIES: data.REPOSITORIES};
        if(data.PROFILE_PIC_URL)
            user = {...user, PROFILE_PIC_URL: data.PROFILE_PIC_URL};
        if(data.BOOKS)
            user = {...user, BOOKS: data.BOOKS}
        if(data.LINKS)
            user = {...user, LINKS: data.LINKS}
        if(result.length > 0){
            await User.updateOne(
                { USER_EMAIL : data.email},
                {$set: user}
            );
        }else{
            user = await new User({...user});
            const savedNote = await user.save();
        }
    }

    static async addNewUser(data){
            if(!data.hasOwnProperty('username') || !data.hasOwnProperty('githublink'))
                throw new Error('data is not present');
            // request to github
            const generated_tags = await this.hitRequestAndExtractTag(data.username);
            data.generated_tags = generated_tags;
            data.knn = await this.calculateKnn(generated_tags, data.email);
            
            // console.log('------------');
            // console.log(data);
            const user = await new User({...data});
            const savedNote = await user.save();
            // console.log(savedNote);
    }

    static async hitRequestAndExtractTag(username){
        let requrl = `https://api.github.com/users/${username}/repos?type=forks`
        const response = await axios.get(requrl)
        if(response.status === 200){
            const extractedTag = await this.extractTag(response.data);
            return extractedTag;
        }
        else{
            throw new Error('Not able to fetch data from fork url')
        }
    }

    static async extractTag(data){
        let tags = []
        for(let repos of data){
            let reponame = repos.full_name.split('/')[1]
            let repodescription = repos.description;
            let language = repos.language;
            tags.push(`${reponame} ${language} ${repodescription}`);
        }
        return tags.join('. ');
    }

    static async calculateKnn(usertag, useremail){
        const knnForGivenUser = [];
        const pipeline = [
            { $match: { email: { $ne: useremail } } },
            { $project: { _id: 0, generated_tags: 1, email: 1 } }
        ];
        const userstaglist = await User.aggregate(pipeline);

        const kneares = new knearest();
        // const otherusertags = userstaglist.map(obj=>obj.generated_tags)
        return await kneares.main(userstaglist, usertag, useremail);

        
        
        
        
        
        
        return knnForGivenUser;
    }


   
}

class knearest {

    cosineSimilarity(tagList1, tagList2) {
        const intersection = tagList1.filter(tag => tagList2.includes(tag));
        const denominator = Math.sqrt(tagList1.length * tagList2.length);
        return intersection.length / tagList1.length;
    }

    // Main function to find k-nearest neighbors
    async main(tagsArray, myTags, myemail) {
        tagsArray.splice(0, 0, {
            "generated_tags" : myTags,
            "email" : myemail
        });
        const tags = [];
        tagsArray.map((row)=>{
            tags.push(row.generated_tags.split(/[.\s]/))
        })

        // Step 2: Compute cosine similarity between each pair of tag lists
        const similarityMatrix = new Matrix(tags.length, tags.length);
        for (let i = 0; i < tags.length; i++) {
            for (let j = 0; j < tags.length; j++) {
                const similarity = this.cosineSimilarity(tags[i], tags[j]);
                similarityMatrix.set(i, j, similarity);
                // similarityMatrix.set(j, i, similarity);
            }
        }

        // Step 3: Print the cosine similarity matrix
        // console.log("Cosine Similarity Matrix:");
        // console.log(similarityMatrix.toString());

        let finalmatrix = {};
        for(let i=0; i<similarityMatrix.rows; i++){
            let curow = []
            for(let j=0; j<similarityMatrix.columns; j++){
                curow.push([similarityMatrix.get(i,j), j]);
            }
            curow.sort();
            curow.reverse();
            let finalrow = []
            for(let index=0; index<curow.length; index++){
                const ele = curow[index]
                if(ele[1] !== i){
                    finalrow.push(tagsArray[ele[1]].email)
                }
            }
            finalmatrix[tagsArray[i].email] = finalrow;
        }
        Object.keys(finalmatrix).forEach(async (email) => {
            if(email !== myemail){

                const query = { email };
                const update = { $set: { knn: finalmatrix[email] } };
                const options = { upsert: true };
                try {
                    // Update or insert document into MongoDB
                    const result = await User.updateOne(query, update, options);
                    // console.log(`Upserted ${result.modifiedCount} document into the collection`);
                } catch (error) {
                    console.error('Error upserting document:', error);
                }
            }
            });
        console.log(finalmatrix);
        return finalmatrix[myemail];

    }

}

module.exports = { UserDbService };