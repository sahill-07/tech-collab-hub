const ProjectDb = require('../models/Project');

class ProjectRecommendationAlgo{
    async main(tags_generated_from_github, client_email, languages){
        const projList = []
        const proj_list_with_added_by = await ProjectDb.aggregate([
            {
              $match: {
                "added_by": { "$exists": true, "$ne": client_email },
                "languages": { "$in": languages },
                "no_of_contributors": { "$lt": 10 }
              }
            },
            {
                $limit: 20
            },
            {
                $sort: {
                  "no_of_contributors": 1 // 1 for ascending order, -1 for descending order
                }
              }
          ])
        for(const proj of proj_list_with_added_by){
            projList.push(proj._id);
        }
        if(proj_list_with_added_by.length < 20){
            const proj_list_without_added_by = await ProjectDb.aggregate([
                {
                  $match: {
                    "added_by": { "$exists": false },
                    "languages": { "$in": languages },
                    "no_of_contributors": { "$lt": 10 }
                  }
                },
                {
                    $limit: 20 - proj_list_with_added_by.length
                },
                {
                    $sort: {
                      "no_of_contributors": 1 // 1 for ascending order, -1 for descending order
                    }
                  }
              ])
            for(const proj of proj_list_without_added_by)
              projList.push(proj._id)
        }

        return projList;
    }
}

module.exports = new ProjectRecommendationAlgo();