import ProductModel from "../model/product.model.js";

class ProductService{
    validateProductData = (data) => {
        let error = {}

        if(!data.title){
            error['title'] = "Title is required"
            // error.title =  "Title is required"
        }else{
            delete error['title'];
        }

        if(!data.category){
            error['category'] = "Category is required"
        }else{
            delete error['category'];
        }

        if(!data.price){
            error['price'] = "Price is required"
        }else{
            delete error['price'];
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


    addProduct =  (data) => {
        try{
            let prod_obj = new ProductModel(data);
            return prod_obj.save();

        }catch(err){
            // console.log("addProdSvc error: ", err);
            throw err;
        }
    }   

    getAllProducts = () => {
        return ProductModel.find()
        .populate('category')
        .populate('brand')

    }

    getActiveProducts = () => {
        // -1 means descending 
        return ProductModel.find({status: 'active'})
        .sort({_id: -1})
        .populate('category')
        .populate('brand')

    }

    getProductsByCat = async(cat) => {
        let pipeline = [
            {
                '$lookup':{
                    'from': "categories",
                    'localField': 'category',
                    'foreignField': '_id',
                    'as': 'category'
                }
            },
            {
                '$lookup':{
                    'from': "labels",
                    'localField': 'brand',
                    'foreignField': '_id',
                    'as': 'brand'
                }
            },
            {
                '$lookup':{
                    'from': "users",
                    'localField': 'seller',
                    'foreignField': '_id',
                    'as': 'seller'
                }
            },
            {
                '$match':{
                    'category-slug': cat,
                    'status': 'active',
                    
                }
            },
            {
                "$sort": {
                    "_id": -1
                } 
            }
        ]
        return ProductModel.aggregate(pipeline)
    }

   

    getProdDetailsById = (id) => {
        return ProductModel.findById(id)
        .populate('category')
        .populate('brand')
    }

    updateProductById = async (data, id, images = null ) => {
        let product = await ProductModel.findById(id);

        let old_images = product.images;

        if (data.images) {
            data.images.map((image) => {
                if(!old_images.includes(image)){
                    old_images.push(image);
                }
            })
        } 

        if(images){
            data.images = images;
        }else{
            data.images = old_images;
        }
        // console.log(old_images);
    
        return ProductModel.findByIdAndUpdate(product._id, {
            $set: data
        });
    }
    

    deleteProductById = (id) => {
        return ProductModel.findByIdAndDelete(id)
    }
}

export default ProductService;    