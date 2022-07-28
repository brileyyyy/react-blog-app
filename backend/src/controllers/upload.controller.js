class UploadController {
    async uploadImage(req, res) {
        res.json({
            url: `/uploads/${req.file.originalname}`
        })
    }
}

export default new UploadController()