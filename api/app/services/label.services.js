import LabelModel from "../model/label.model.js";
class LabelService{
    validateLabel = (data, file) => {
        let err = {
            title: "",
            type: "",
            image: "",
        }

        // console.log(data);
        if(!data?.title) {
            err.title = "Title is required"
        }else{
            delete err.title;
        }

        if(!data?.type){
            err.type = "Type is required"
        }else{
            delete err.type;
        }

        if(!file){
            err.image = "Image is required"
        }else{
            delete err.image;
        }
        
        return (Object.keys(err).length === 0) ? null : err;
    }

    labelCreate = (data) => {
        let label = new LabelModel(data);
        return label.save();
    }

    getLabels = async (filters) => {
        // 1 = ascending order : -1 = descending order 
        let all_labels = await LabelModel.find(filters).sort({_id: 1});
        return all_labels;
    }
    
    getLabelById =  (id) => {
        return LabelModel.findById(id);
    }

    labelUpdate = (data, id) => {
        return LabelModel.findByIdAndUpdate(id, {
            $set: data
        })
    }

    labelDelete = async (id) => {
        return LabelModel.findByIdAndDelete(id)
    }
}

export default LabelService;