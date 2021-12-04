const RegistrationModel = require("../Models/RegistrationModel");

// :Registration/
exports.DefaultAPI = (req, res) => {
    res.json({data : "Registration APIs"});
};

// List all user :Registration/List
exports.ListAllRegistration = async (req, res) => {
    try{
        const registrationList = await RegistrationModel.find();

        if(registrationList.length === 0){
            return res.json({data : "No record found :(!"});
        }
        return res.json({data : registrationList});
    } catch(err){
        return res.json({data : `Error : ${err}}`});
    }
}; 

// Check login :Registration/Login
exports.CheckLogin = async (req, res) => {
    try{
        const username = req.body.Username;
        const password = req.body.Password;
        const user = await RegistrationModel.findOne({Name : username, MobileNo : password});

        if(user)
            return res.json({data : user});
        
            return res.json({data : "Wrong username or password!"});        
    } catch(err){
        return res.json({data : `Error : ${err}`});
    }
};

// Add user :Registration/Add
exports.AddRegistration = (req, res) => {
    try{
        const { user } = req.body;
        RegistrationModel.create(user);
        return res.json({data : "Success!"});
    } catch(err){
        return res.json({data : `Error : ${err}`});
    }
};

// :Registration/Change
exports.UpdateRegistration = async (req, res) => {
    try{    
        const { user } = req.body;        
        const updatedUser = await RegistrationModel.findOneAndUpdate(
            {RegistrationID: user.RegistrationID}
            , { $set : {
                    Name : user.Name
                    , EmailID : user.EmailID
                    , MobileNo : user.MobileNo
                    , DOB : user.DOB
                }
            }
            , {new : true}
        );
        if(updatedUser.length === 0)
            return res.json({data : `Failed ${user.RegistrationID}`});            
        else
            return res.json({data : "Success!"});

    } catch(err){
        return res.json({data : `Error : ${err}`});
    }
};

// :Registration/Delete/1
exports.DeleteRegistration = async (req, res) => {
    try{
        const RegistrationID = req.params.RegistrationID;
        const deletedUser = await RegistrationModel.findOneAndDelete(
            {RegistrationID : RegistrationID}
        );

        return res.json({data : "Success!"});
    } catch(err){
        return res.json({data : `Error : ${err}`});
    }
};