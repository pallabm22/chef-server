const categoryModel=require("../models/caregoryModel")

//create restaurant
const createcategoryController = async (req, res) => {
    try {
        const { title, imageURL } = req.body;
        if (!title) {
            res.status(404).send({
                success: false,
                message:"Title or image is not provided"
            })
        }
        const newcategory = new categoryModel({ title, imageURL });
        await newcategory.save();
        res.status(200).send({
            success: true,
            message: "Food Category has been successfully created.",
            newcategory
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Problem in Create category api",
            error
        })
    }
 };
    

//get all category
const getallcategoryController = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        if (!categories) {
            return res.status(404).send({
                success: false,
                message:"No categories are found",
            })
        }
        res.status(200).send({
            success: true,
            message: "Categories are fetched successfully",
            TotalCategory:categories.length,
            categories,
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Problem in get all category api",
            error
        })
    }
};
 

//update category by id
const categoryupdateController = async (req, res) => {
    try {
        const categoryId = req.params.id;
        if (!categoryId) {
            return res.status(404).send({
                success: false,
                message:"Please provide a catgory id to update",
            })
        }

        const { newtitle, newimageURL } = req.body;
        if (!newtitle || !newimageURL) {
            return res.status(404).send({
                success: false,
                message:"Please provide the new title and imageurl"
            })
        }

        const category = await categoryModel.findById(categoryId);
        if (!category) {
            return res.status(404).send({
                success: false,
                message:"category is not found",
            })
        }
        category.title = newtitle;
        category.imageURL = newimageURL;
        category.new = true;
        await category.save();
        
        res.status(200).send({
            success: true,
            message: "Category has been successfully updated",
            category
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in update category api",
            error
        })
    }
 };


//delete category by id
const deletecategoryController = async (req, res) => {
    try {
        const categoryId = req.params.id;
        if (!categoryId) {
            return res.status(404).send({
                success: false,
                message:"Please provide a catgory id to delete",
            })
        }
        const category = await categoryModel.findById(categoryId);
        if (!category) {
            return res.status(404).send({
                success: false,
                message:"category not found",
            })
        }
        const deletedCategory = await categoryModel.findByIdAndDelete(categoryId);
        res.status(200).send({
            success: false,
            message: "category is successfully deleted",
            deletedCategory,
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Problem in delete category api",
            error
        })
    }
 };
    
module.exports = {createcategoryController ,getallcategoryController,categoryupdateController, deletecategoryController};

