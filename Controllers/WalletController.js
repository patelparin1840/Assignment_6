const WalletModel = require("../Models/WalletModel");

//Default API : /
exports.DefaultAPI = (req, res) => {
    return res.json({data : "Wallet APIs"});
};

//List all transaction :List/
exports.ListAllTransaction = async (req, res) => {
    try{
        const registrationID = req.body.RegistrationID;
        const walletList = await WalletModel.find({RegistrationID : registrationID});

        if(walletList.length === 0){
            return res.json({data : "No transaction found :(!"});
        } 

        return res.json({data : walletList});
    } catch(err) {
        return res.json({data : `Error : ${err}`});
    }
};
//List all deposit transaction :Type/Deposit
exports.ListAllTransactionByType = async (req, res) => {
    try{
        const registrationID  = req.body.RegistrationID;
        const transactionType = req.params.TransactionType;
        const walletList = await WalletModel.find(
            {
                RegistrationID : registrationID,
                TransactionType : transactionType
            });

        if(walletList.length === 0){
            return res.json({data : "No record found :(!"});
        }

        return res.json({data : walletList});
    } catch(err) {
        return res.json({data : `Error : ${err}`});
    }
};
//Get total wallet amount : TotalAmount
exports.GetTotalAmount = async (req, res) => {
    try{
        const registrationID = req.body.RegistrationID;
        const walletList = await WalletModel.find({RegistrationID : registrationID});
        
        if(walletList.length === 0){
            return res.json({data : "No record found :(!"});
        } else {
            var totalDeposit = 0;
            var totalWithdrawal = 0;
            walletList.forEach((value, index) => {            
                if(value["TransactionType"] == "Deposit")
                    totalDeposit += value["Amount"];
                else if(value["TransactionType"] == "Withdrawal")
                    totalWithdrawal += value["Amount"];
            });
            
            return res.json({data : {
                "TotalDeposit" : totalDeposit,
                "TotalWithdrawal" : totalWithdrawal,
                "TotalBalance" : (totalDeposit - totalWithdrawal)
            }});
        }     
    } catch(err) {
        return res.json({data : `Error : ${err}`});
    }
};

//Add amount :AddIn/
exports.AddInWallet = (req, res) => {
    try{
        const { wallet } = req.body;
        WalletModel.create(wallet);

        return res.json({data : "Success!"});
    } catch(err){
        return res.json({data : `Error : ${err}`});
    }
};

//Change amount :Change/
exports.UpdateWallet = async (req, res) => {
    try{
        const { wallet } = req.body;
        const updatedWallet = await WalletModel.findOneAndUpdate(
            {WalletID : wallet.WalletID},
            {$set : {
                Amount : wallet.Amount,
                TransactionType : wallet.TransactionType,
                UpdatedTime : new Date()
            }},
            {new : true}
        );

        if(updatedWallet.length === 0)
            return res.json({data : `Failed ${wallet.WalletID}`});
        
        return res.json({data : `Updated transaction - ${updatedWallet}`});
    } catch(err) {
        return res.json({data : `Error : ${err}`});
    }
}; 

//Delete :Delete/1
exports.DeleteWallet = async (req, res) => {
    try{
        const walletID = req.params.WalletID;
        const deletedWallet = await WalletModel.findOneAndDelete({WalletID : walletID});
       
        res.json({data : `Deleted transaction - ${deletedWallet}`});
    } catch(err) {
        return res.json({data : `Error : ${err}`});
    }
};
