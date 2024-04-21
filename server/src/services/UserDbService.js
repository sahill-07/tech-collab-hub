const { default: axios } = require('axios');
const User = require('../models/User');
const { response } = require('express');
const natural = require('natural');
const { Matrix } = require('ml-matrix');
const ProjectRecommendationAlgo = require('./ProjectRecommendationAlgo');
const UserAnalytics = require('./UserAnalytics');

class UserDbService {
    requiredFields = {
        username: 'string',
        githublink: 'string',
        is_currently_a_student: 'string',
        curr_semester: 'string',
        college_name: 'string',
        area_of_interest: 'array',
        experience: 'array',
        preferred_learning_resource: 'array',
        tech_stack_interest: 'array',
        uid : 'string'
      };

// res, req.body.email, req.body
    async addNewUser(res, client_email, data){


            const validateJson = this.validateJson(data);
            if(validateJson !== true){
                res.status(400).json(validateJson)
                return ;
            }else{
                data = this.getData(data);
            }

            const github_user_id = data.githublink.split('github.com/')[1];
            const { generated_tags, generated_language } = await this.hitRequestAndExtractTag(github_user_id);
            data.generated_tags = generated_tags;


            data.knn = await this.calculateKnn(generated_tags, client_email);

            const projectList = await ProjectRecommendationAlgo.main(generated_tags, client_email, generated_language);
            data.projectList = projectList;
            
            const githubAnalytics = await UserAnalytics.fetchGitHubStats(github_user_id)
            data = {...data, ...githubAnalytics}

            const user = await new User({...data, email : client_email});
            const savedNote = await user.save();

            res.status(200).json(savedNote);
    }


    validateJson(jsonData) {
        for (const field in this.requiredFields) {
          if (!(field in jsonData)) {
            return `Field '${field}' is missing in the JSON data.`;
          }
      
          const expectedType = this.requiredFields[field];
          const actualType = Array.isArray(jsonData[field]) ? 'array' : typeof jsonData[field];
      
          if (actualType !== expectedType) {
            return {message: `Field '${field}' has invalid type. Expected type: '${expectedType}', Actual type: '${actualType}'.`};
          }
        }

        return true;     
      }

    getData(data){
        let newdata = {};
        for(const field in this.requiredFields){
            newdata[field] = data[field]
        }
        return newdata;
    }
      

    async hitRequestAndExtractTag(username){
        let requrl = `https://api.github.com/users/${username}/repos?type=forks`
        const response = await axios.get(requrl)
        if(response.status === 200){
            const extractedTag = await this.extractTag(response.data);
            return extractedTag
        }
        else{
            throw new Error('Not able to fetch data from fork url')
        }
    }

    async extractTag(data){
        let tags = []
        let languagear = []
        for(let repos of data){
            let reponame = repos.full_name.split('/')[1]
            let repodescription = repos.description;
            let genearate_tags = reponame + ' ' + repodescription;
            
            let language = repos.language;
            if(language !== null){
                genearate_tags = genearate_tags + ' ' + language;
                languagear.push(language);
            }

            const repoTopics = repos.topics;
            if(repoTopics !== null && Array.isArray(repoTopics)){
                for(const topic of repoTopics)
                    languagear.push(topic);
                genearate_tags = genearate_tags + ' ' + (repoTopics.join(', '))
            }
            
            tags.push(genearate_tags);
        }
        return {
            generated_tags : tags.join(', '),
            generated_language : [...new Set(languagear)]
        }
    }

    async calculateKnn(usertag, useremail){
        const knnForGivenUser = [];
        const pipeline = [
            { $match: { email: { $ne: useremail } } },
            { $project: { _id: 0, generated_tags: 1, email: 1 } }
        ];
        const userstaglist = await User.aggregate(pipeline);

        const kneares = new knearest();
        // const otherusertags = userstaglist.map(obj=>obj.generated_tags)
        return await kneares.main(userstaglist, usertag, useremail);

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
        return finalmatrix[myemail];

    }

}

module.exports = new UserDbService();