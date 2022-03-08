const mongoose = require("mongoose");

const schema = mongoose.Schema;

const Profile = schema({
    username : {
        type: String,
        required: true,
        unique: true,
    },
    name:String,
    proffession: String,
    DOB: String,
    titleline: String,
    about: String,
    img:{
        type:String,
        default: ""
    },
},
    {
        timestamp:true,
    
});

module.exports = mongoose.model("Profile", Profile);