const mongoose = require("mongoose");
mongoose.pluralize(null);

const RegistrationSchema = mongoose.Schema({
    RegistrationID : String,
    Name : String,
    EmailID : String,
    MobileNo : String,
    DOB : Date,
});

const RegistrationModel = mongoose.model("RegistrationDetail",RegistrationSchema);

module.exports = RegistrationModel;