import fs from "fs";

class DeleteImageService {
    getUploadPath(filePath) {
        const fileArray = filePath.split('/')
        const fileName = fileArray[fileArray.length - 1]
        const localFilePath = `src/uploads/${fileName}`

        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath)
        }
    }
}

export default new DeleteImageService()