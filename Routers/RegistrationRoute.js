const express = require("express");
const router = express.Router();
router.use(express.json());

const RegistrationController = require("../Controllers/RegistrationController");

// :Registration/
router.get("/", RegistrationController.DefaultAPI);
// :Registration/Login
router.get("/Login", RegistrationController.CheckLogin);
// :Registration/List
router.get("/List", RegistrationController.ListAllRegistration);
// :Registration/Add
router.post("/Add", RegistrationController.AddRegistration);
// :Registation/Change
router.put("/Change", RegistrationController.UpdateRegistration);
// :Registration/Delete/1
router.delete("/Delete/:RegistrationID", RegistrationController.DeleteRegistration);

module.exports = router;