const { mongoose } = require("mongoose");
const DATABASE_TABLE_NAME = "user";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    githublink: {
        type: String,
        required: true,
    },
    is_currently_a_student: {
        type: String,
        required: true
    },
    curr_semester: {
        type: String,
        // required: true
    },
    college_name: {
        type: String,
        // required: true
    },
    area_of_interest: {
        type: Array,
        required: true,
        validate: {
            validator: function(v) {
                return Array.isArray(v) && v.length > 0;
            },
            message: props => `${props.value} is not a valid array or is empty.`
        }
    },
    experience: {
        type: Array,
        required: true,
        validate: {
            validator: function(v) {
                return Array.isArray(v) && v.length > 0;
            },
            message: props => `${props.value} is not a valid array or is empty.`
        }
    },
    preferred_learning_resource: {
        type: Array,
        required: true,
        validate: {
            validator: function(v) {
                return Array.isArray(v) && v.length > 0;
            },
            message: props => `${props.value} is not a valid array or is empty.`
        }
    },
    tech_stack_interest: {
        type: Array,
        required: true,
        validate: {
            validator: function(v) {
                return Array.isArray(v) && v.length > 0;
            },
            message: props => `${props.value} is not a valid array or is empty.`
        }
    },
    generated_tags: {
        type: String,
    },
    knn: {
        type: Array,
        required: true,
        validate: {
            validator: function(v) {
                return Array.isArray(v);
            },
            message: props => `${props.value} is not a valid array or is empty.`
        }
    },
    projectList: {
        type: Array,
        required: true,
        validate: {
            validator: function(v) {
                return Array.isArray(v) && v.length > 0;
            },
            message: props => `${props.value} is not a valid array or is empty.`
        }
    },
    "total_commits": {
        type : String
    },
    "total_pull_request": {
        type: String
    },
    "star_earned": {
        type : String
    },
    "uid" : {
        type : String
    },
    "saved_repo" : []

})



module.exports = mongoose.model(DATABASE_TABLE_NAME, userSchema);