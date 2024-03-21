const { mongoose } = require("mongoose");
const DATABASE_TABLE_NAME = "user";

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    githublink : {
        type : String,
        required: true,
        unique: true,
    },
    tags : [],
    collegeName : {
        type: String,
    },
    semester : {
        type : String
    }

})

module.exports = mongoose.model(DATABASE_TABLE_NAME, userSchema);