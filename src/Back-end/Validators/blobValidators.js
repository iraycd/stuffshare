import ValidationException from './../Architecture/Exceptions/validationExceptions.js'
import CONFIG from '../config.js';
import BlobBase64DTO from '../../Shared/DTO/Blob/BlobBase64DTO.js';

async function getSizeOfUplodedFile(blob) {
    if (blob.getSize(blob) > 2000) {
        new ValidationException().throw({
            code: "FILE_IS_TOO_BIG",
            field: "type"
        });
    }
}

async function checkUploadedFileType(blob) {
    if (!CONFIG.UPLOADED_TYPE.includes(blob.type)) {
        new ValidationException().throw({
            code: "UNRECOGNIZE_FILE_TYPE",
            field: "type"
        });
    }
}

async function countOfUsersImages() {
    let result = await this.blobServiceDI.setContext(this.context).getBlobs({ userId: this.context.user.id, itemId: null })
    if (result.length > 4) {
        new ValidationException().throw({
            code: "TOO_MANY_USER_IMAGES",
            field: "blob"
        });
    }
}

let BlobValidators = {
    countOfUsersImages,
    checkUploadedFileType,
    getSizeOfUplodedFile
}
export default BlobValidators
