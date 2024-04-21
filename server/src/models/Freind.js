const { mongoose } = require("mongoose");
const DATABASE_TABLE_NAME = "freind";

const FreindSchema = new mongoose.Schema({
    uid : {
        type : String,
        unique : true,
        required : true
    },
    freinds : [],
    groupchat : []
  });

module.exports = mongoose.model(DATABASE_TABLE_NAME, FreindSchema);