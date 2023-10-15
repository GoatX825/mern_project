import multer from 'multer';

const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let path = process.cwd() + '/uploads';
        cb(null, path);
    },
    filename: (req, file, cb) => {
        let f_name = Date.now() + '-' + file.originalname;          // a.jpg => 12345-a.jpg
        cb(null, f_name);
    }
    
})

const imageFilter = (req, file, cb) => {
    let allowed_files = ['jpg', 'jpeg', 'png', 'webp', 'svg', 'bmp', 'gif']
    
    // a.jpg => jpg , a.jpg => ["a", "jpg"]
    let ext = file.originalname.split('.')
    ext = ext[ext.length - 1]
    if(allowed_files.includes(ext)){
        cb(null, true)
    }else{
        cb(true, false)
    }
}

// third party middleware
const uploader = multer({
    
    storage: myStorage,
    fileFilter: imageFilter
})

export default uploader;
