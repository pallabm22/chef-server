const express = require("express");
const { testuserController } = require("../controllers/testController");

//router object
const router = express.Router();

//routes Get|post|put|delete
router.get('/test-user', testuserController);


module.exports = router;