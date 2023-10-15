import CategoryModel from "../model/category.model.js";

class CategoryService{
    validateCategoryData = (data) => {
        let error = {}

        if(!data.title){
            error['title'] = "Title is required"
            // error.title =  "Title is required"
        }else{
            delete error['title'];
        }

        if(!data.status){
            error['status'] = "Status is required"
        }else{
            delete error['status'];
        }

        // can do either return or throw
        if(Object.keys(error).length <= 0){
            return null;
        }else{
            return error;
        }
    }

    addCategory = (data) => {
        let cat_obj = new CategoryModel(data);
        return cat_obj.save();
    }

    getAllCategories = () => {
        return CategoryModel.find()
        .populate('parent')
        .populate('brand')
    }

    getCatDetailsById = (id) => {
        return CategoryModel.findById(id)
        .populate('parent')
        .populate('brand')
    }

    updateCategoryById = (data, id) => {
        return CategoryModel.findByIdAndUpdate(id, {
            $set: data
        })
    }

    deleteCategoryById = (id) => {
        return CategoryModel.findByIdAndDelete(id)
    }
}

export default CategoryService;