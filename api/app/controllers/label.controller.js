import LabelService from "../services/label.services.js";
const labelSvc = new LabelService();
class LabelController{
    store = async (req, res, next) => {
        // banner(slider), brands
        let data  = req.body;
        let validation = labelSvc.validateLabel(data, req.file);
        // console.log(data, req.file);
        
        if(validation){
            next({
                status_code: 400,
                msg: validation
            })
        }else{
            try{
                data.image = req.file.filename;
                let success = await labelSvc.labelCreate(data);
                res.json({
                    result: success,
                    status: true,
                    msg: "Label created successfully"
                })

            }catch(error){
                console.error("labelCreate Error: " ,error);
                next({
                    status_code: 400,
                    msg: error
                })
            }


        }
    }

    getAllLabels = async  (req, res, next) => {
        try{
            let filters = {};
            if(req.query.type){
                filters = {
                    type: req.query.type
                }
            }
            let data = await labelSvc.getLabels(filters);
            res.json({
                result: data,
                status: true,
                msg: "Label fetched successfully"
            })

        }catch(error){
            console.error("labelFetch Error: " ,error);
            next({
                status_code: 400,
                msg: error
            })
        }
    }

    getAllActiveLabels = async (req, res, next) => {
        try{
            let filters = {
                type: req.query.type,
                status: req.query.status 
            };
            let data = await labelSvc.getLabels(filters);
            res.json({
                result: data,
                status: true,
                msg: "Label fetched successfully"
            })

        }catch(error){
            console.error("labelFetch Error: " ,error);
            next({
                status_code: 400,
                msg: error
            })
        }
    }
    getLabelById = async (req, res, next) => {
        try{
           
            let data = await labelSvc.getLabelById(req.params.id);
            res.json({
                result: data,
                status: true,
                msg: "Label Details fetched successfully"
            })

        }catch(error){
            console.error("labelFetch Error: " ,error);
            next({
                status_code: 400,
                msg: error
            })
        }
    }

    update = async (req, res, next) => {
        // banner, brands
        let data  = req.body;
        let validation = labelSvc.validateLabel(data, req.file);
        // console.log(data, req.file);
        
        if(validation?.image){
            delete validation.image;
        }

        if(validation && Object.keys(validation).length > 0){
            next({
                status_code: 400,
                msg: validation
            })
        }else{
            try{
                if(req.file){
                    data.image = req.file.filename;

                }
                
                if(data.image === 'null'){
                    delete data.image;
                }
                

                let success = await labelSvc.labelUpdate(data, req.params.id);
                res.json({
                    result: data,
                    status: true,
                    msg: "Label updated successfully"
                })

            }catch(error){
                console.error("labelUpdate Error: " ,error);
                next({
                    status_code: 400,
                    msg: error
                })
            }


        }
    }

    delete = async (req, res, next) => {
        try{
            let data = await labelSvc.labelDelete(req.params.id);
            res.json({
                result: null,
                status: true,
                msg: "Label deleted successfully"
            })

        }catch(error){
            console.error("labelDelete Error: " ,error);
            next({
                status_code: 400,
                msg: error
            })
        }
    }
}

export default LabelController;