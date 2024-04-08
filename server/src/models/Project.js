const { mongoose } = require("mongoose");
const DATABASE_TABLE_NAME = "project";

const projectSchema = new mongoose.Schema({
    repo_name: String,
    contributors: [String],
    description: String,
    languages: [String],
    no_of_contributors: Number,
    proj_id: Number,
    project_icon: String,
    repo_author: String,
    repo_link: String,
    similarity_matrix: [Number],
    topic: mongoose.Schema.Types.Mixed, // Since "topic" can be a number or NaN, we use Mixed type to accommodate both
    added_by : String,
  });

module.exports = mongoose.model(DATABASE_TABLE_NAME, projectSchema);