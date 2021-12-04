const mongoose = require("mongoose");
mongoose.pluralize(null);

const WalletSchema = mongoose.Schema({
    WalletID : String,
    RegistrationID : String,
    Amount : Number,
    TransactionType : {type :String, default : "Deposit"}, 
    InsertedTime : {type : Date, default : Date.now},
    UpdatedTime : {type: Date, default : Date.now}
});

const WalletModel = mongoose.model("WalletDetail",WalletSchema);

module.exports = WalletModel;
