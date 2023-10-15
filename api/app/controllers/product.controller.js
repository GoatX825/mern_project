import slugify from "slugify";
import ProductService from "../services/product.services.js";
import ProductModel from "../model/product.model.js";
import CategoryModel from '../model/category.model.js'
const prod_svc = new ProductService();
class ProductControler{

    /**
     * Do either Up or Down Way
     constructor(){
         this.prod_svc = new ProductService();
     }
     */


    // recursive function or recursive call ko ex: call itself
    uniqueSlug = async (slug) =>{
        try{
            let result = await ProductModel.findOne({
                slug: slug
            })
            // console.log("slug: ", result);


            if(result){
                // Generate a new slug and recursively call uniqueSlug
                const newSlug = Date.now() + "-" + slug;
                return this.uniqueSlug(newSlug);
            }else{
                // console.log("MERO SLUG YO HO : ", slug);
                return slug;
            }

        }catch (error) {
            // console.log("Error in uniqueSlug: ", error);
            throw error;
        }
    }

     
    addProduct = async (req, res, next) => {
        try{
            let data  = req.body;
            let validation = prod_svc.validateProductData(data);
            if(validation){
                throw validation;
            }else{
                // validation success => data entry
                let slug = slugify(data.title, {
                    lower: true,
                    replacement: "-"
                }); 

                // Ensure that the slug is unique
                let newSlug = await this.uniqueSlug(slug);  
                // console.log(newSlug);


                // modify the slug : don't modify slug during updation
                data.slug = newSlug;
                // console.log("The New Slug is : ", newSlug);
                
                if (!data.slug) {
                    data.slug = null;
                }
                
                data.after_discount = data.price - data.price * data.discount/100;

                if(!data.brand || data.brand === 'null'){
                    data.brand = null;  
                }

                // if(!data.seller) {
                //     data.seller = null;
                // }
                if (!isValidObjectId(data.seller)) {
                    // Handle invalid "seller" field gracefully
                    data.seller = null;
                }


                if(req.files){
                    let images = [];
                    req.files.map((image) => {
                        images.push(image.filename);
                    })
                    data.images = images;
                }

                data.category = data.category.split(',');

                let response = await prod_svc.addProduct(data); 
                if(response){
                    res.json({
                        result: response,
                        status: true,
                        msg: "Product Created Successfully"
                    })
                }else{
                    next({
                        status_code: 400,
                        msg: "Problem while creating product"
                    })
                }
            }

        }catch(error){
            console.log("Product Add Error: ", error);
            next({
                status_code: 400,
                msg: error
            })
        }
    }

    getAllProducts = async (req,res, next) => {
        try{
            let response = await prod_svc.getAllProducts();
            // console.log(response);
            res.json({
                result: response,
                status: true,
                msg: "Producs Fetched Successfully"
            })

        }catch(err){
            console.log("Productt List Error", err)
            next({
                status_code: 400,
                msg: err
            })
        }
    }

    getAllActiveProducts = async (req,res, next) => {
        try{
            let response = await prod_svc.getActiveProducts();
            // console.log(response);
            res.json({
                result: response,
                status: true,
                msg: "Producs Fetched Successfully"
            })

        }catch(err){
            console.log("Productt List Error", err)
            next({
                status_code: 400,
                msg: err
            })
        }
    }

    getAllProductsByCat = async (req, res, next) => {
        try{
            let category = await CategoryModel.findOne({
                slug: req.params.slug
            })
            let response = await prod_svc.getProductsByCat(req.params.slug);
            // console.log(response);
            res.json({
                result: response,
                status: true,
                msg: "Producs Fetched Successfully"
            })

        }catch(err){
            console.log("Productt List Error", err)
            next({
                status_code: 400,
                msg: err
            })
        }
    }
    updateProduct = async (req, res, next) => {
        try{
            let data  = req.body;
            let validation = prod_svc.validateProductData(data);

            // if validation fails
            if(validation){
                throw validation;
            }else{
                // validation success => data entry
                
                data.after_discount = data.price - data.price * data.discount/100;

                if(!data.brand || data.brand === 'null'){
                    data.brand = null;  
                }

                // TO DO : depends on FE Data Structure 
                if(req.files){
                    let images = [];
                    req.files.map((image) => {
                        images.push(image.filename);
                    })

                    data.images = images;
                }

                if(!data.seller){
                    data.seller = null;
                }

                let response = await prod_svc.updateProductById(data, req.params.id); 
                if(response){
                    res.json({
                        result: response,
                        status: true,
                        msg: "Product Updated Successfully"
                    })
                }else{
                    next({
                        status_code: 400,
                        msg: "Problem while updating product"
                    })
                }
            }

        }catch(error){
            console.log("Product Update Error: ", error);
            next({
                status_code: 400,
                msg: error
            })
        }
    }

    deleteImageByProductId =  async (req, res, next) => {
        try{
            let product_id = req.params.id;
            let image_name = req.params.image_name;

            let product = await prod_svc.getProdDetailsById(product_id);
            let images = product.images.filter((image) => image !== image_name);
            await prod_svc.updateProductById(product, product_id, images)
            res.json({
                result: product,
                status: true,
                msg: "Image Deleted Successfully"
            })

        }catch(err){
            console.log("Product Image Delete error: ", err);
            next({
                status_code: 400,
                msg: err
            })
        }

    }   

    deleteProductById = async (req, res, next) => {
        try{
            let del = await prod_svc.deleteProductById(req.params.id)
            if(del){
                res.json({
                    result: null,
                    status: true,
                    msg: "Product Deleted Successfully"
                })
            }
        }catch(err){
            console.log("Product Image Delete error: ", err);
            next({
                status_code: 400,
                msg: err
            })
        }
    }

    getProductById = async (req, res, next) => {
        try{
            let prod = await prod_svc.getProdDetailsById(req.params.id)
            if(prod){
                res.json({
                    result: prod,
                    status: true,
                    msg: "Product Fetched Successfully"
                })
            }
        }catch(err){
            // console.log("Product detail error: ", err);
            next({
                status_code: 400,
                msg: err
            })
        }
        
    }
    
}

export default ProductControler;