const express = require('express');
const multer = require('multer');
const compoundDataController = require('../controller/compoudDataController');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './templates/assets/')
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'text/csv'){
        cb(null, true)
    }
    else {
        cb(null, false)
    }
    
}

const upload = multer({storage: storage, 
    limits : {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter : fileFilter,
})

router.post("/uploadCompoundData", upload.single('file'), compoundDataController.uploadCompoundData);
router.get("/getAllCompoundData", compoundDataController.getAllCompoundData);
router.post("/editCompound", compoundDataController.editCompound);

module.exports = {
    router
}