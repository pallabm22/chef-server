const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createcategoryController,getallcategoryController, categoryupdateController,deletecategoryController } = require('../controllers/categoryController');


const router = express.Router();

//routes
//create category
router.post('/createCategory',authMiddleware,createcategoryController)

//get all category
router.get('/getallcategory', authMiddleware, getallcategoryController);

//update category by id
router.put('/updatecategory/:id', authMiddleware, categoryupdateController);

//delete category by id
router.delete('/deletecategory/:id',authMiddleware,deletecategoryController)
module.exports = router;