const express = require("express");
const router = express.Router();
router.use(express.json());

const WalletController = require("../Controllers/WalletController");

//Default API :Wallet/
router.get("/", WalletController.DefaultAPI);
//List all transaction :Wallet/List/
router.get("/List", WalletController.ListAllTransaction);
//List all deposit transaction :Wallet/Type/Deposit
router.get("/Type/:TransactionType", WalletController.ListAllTransactionByType);
//Total amount :Wallet/Total
router.get("/Total", WalletController.GetTotalAmount);
//Add amount :Wallet/AddIn/
router.post("/AddIn", WalletController.AddInWallet);
//Change amount :Wallet/Change/
router.put("/Change", WalletController.UpdateWallet);
//Delete :Delete/1
router.delete("/Delete/:WalletID", WalletController.DeleteWallet);

module.exports = router;