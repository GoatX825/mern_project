import CategoryService from "../services/category.services.js";
const cat_svc  = new CategoryService();
import slugify from "slugify";
class CategoryController{

    /* Can be followed this as well
    constructor() {
        this.cat_svc = new CategoryService();
    }
    */
    
    createCategory = async (req, res, next) => {
        try{
            let data = req.body;
            let error = cat_svc.validateCategoryData(data);
            if(error){
                next({
                    status_code: 400,
                    msg: error
                })
            }else{
                if(req.file){
                    data.image = req.file.filename;
                }
                
                if(!data.parent || data.parent === 'null'){
                    data.parent  =  null;
                }

                if(data.brand){
                    // data.brand = data.brand.split(",");
                }
 
                // slug
                data.slug = slugify(data.title, {
                    lower: true,
                    replacement: "-"

                })

                let result = await cat_svc.addCategory(data);
                if(result){
                    res.json({
                        result: result,
                        status: true, 
                        msg: "Category added successfully"
                    })
                }else{
                    next({
                        status_code: 400,
                        msg: "Sorry! There was a problem creating the category"
                    })
                }
            }

        }catch(error){
            console.error("CategoryCreateError: ", error);
            next({
                status_code: 400,
                msg: error
            })
        }
    }

    getAllCats = async (req, res, next) => {
        try{
            let result = await cat_svc.getAllCategories();
            res.json({
                result: result,
                status: true, 
                msg: "Category listed successfully" 
            })
        }catch(err){
            console.error("CategoryFetchError: ", err);
            next({
                status_code: 400,
                msg: err
            })
        }
    }
   
    getCategoryDetail = async (req, res, next) => {
        try{
            let result = await cat_svc.getCatDetailsById(req.params.id);
            res.json({
                result: result,
                status: true, 
                msg: "CategoryDetails fetched successfully" 
            })
        }catch(err){
            console.error("CategoryDetailError: ", err);
            next({
                status_code: 400,
                msg: err
            })
        }
    }

    updateCategory = async(req, res, next) => {
        try{
            let data = req.body;
            let error = cat_svc.validateCategoryData(data);
            if(error){
                next({
                    status_code: 400,
                    msg: error
                })
            }else{
                if(req.file){
                    data.image = req.file.filename;
                }
                
                if(!data.image || data.image === 'null'){
                    delete data.image;
                }

                if(!data.parent || data.parent === 'null'){
                    data.parent  =  null;
                }

                if(data.brand){
                    data.brand = data.brand.split(",");
                }

                let result = await cat_svc.updateCategoryById(data, req.params.id);
                if(result){
                    res.json({
                        result: result,
                        status: true, 
                        msg: "Category Updated successfully"
                    })
                }else{
                    next({
                        status_code: 400,
                        msg: "Sorry! There was a problem updating the category"
                    })
                }
            }

        }catch(error){
            console.error("CategoryUpdateError: ", error);
            next({
                status_code: 400,
                msg: error
            })
        }
    }

    deleteCategoryById = async (req, res, next) => {
        try{
            let result = await cat_svc.deleteCategoryById(req.params.id);
            res.json({
                result: null,
                status: true, 
                msg: "Category Deleted successfully" 
            })
        }catch(err){
            console.error("CategoryDeleteError: ", err);
            next({
                status_code: 400,
                msg: err
            })
        }
    }

}

export default CategoryController;