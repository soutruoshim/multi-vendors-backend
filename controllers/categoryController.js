const Category = require('../models/Category');

module.exports = {
    
    createCategory: async (req, res) => {
        const newCategory = new Category(req.body);
        try {
            await newCategory.save();
            res.status(201).json({ status: true, message: "Category created successfully" });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    updateCategory: async (req, res) => {
        const { id } = req.params; // Get ID from URL
        try {
            const updatedCategory = await Category.findByIdAndUpdate(
                id,
                { $set: req.body }, // Update fields
                { new: true }       // Return updated document
            );
    
            if (!updatedCategory) {
                return res.status(404).json({ status: false, message: "Category not found" });
            }
    
            res.status(200).json({ status: true, message: "Category updated successfully", data: updatedCategory });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getAllCategories: async (req, res) => {
        try {
            const categories = await Category.find({ title: {$ne: "More"}}, {__v: 0});

            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });  
        }
    },

    getRandomCategories: async (req, res) => {
        try {
            let categories = await Category.aggregate([
                {$match: {value: {$ne: "more"}}},
                {$sample: {size: 4}}
            
            ]);


            const moreCategory = await Category.findOne({value: "more"}, {__v: 0});

            if(moreCategory){
                categories.push(moreCategory)
            }

            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message }); 
        }
    }
};