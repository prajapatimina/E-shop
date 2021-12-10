const express = require("express")
const router = express.Router()
const multer = require('multer')

const controller = require("../controllers/product")

const FILE_TYPE_MAP = {
    'image/png':'png',
    'image/jpeg':'jpeg',
    'image/jpg': 'jpg'

}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type')
        if(isValid){
            uploadError = null
        }
      cb(uploadError, './public/uploads')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname
        const extension = FILE_TYPE_MAP[file.mimetype]
      cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
  })
  const upload = multer({ storage: storage })

router.post('/create', upload.single('image'),controller.createProduct)
router.get('/read',controller.getAllProduct)
router.get('/read/:id',controller.getByProductId)
router.put('/update/:id', controller.updateProduct)
router.get('/count',controller.countProduct)
router.get('/featured', controller.getFeaturedProduct)
router.get('/', controller.filterProduct)
router.delete('/remove/:id', controller.deleteProduct)


module.exports = router;