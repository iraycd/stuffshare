import BaseService from "../Architecture/baseService.js";
import BlobRepository from "../Repository/blobRepository.js";
import fs from "fs-extra";
import ServerException from "../Architecture/Exceptions/serverException.js";
import CONFIG from "../config.js";
import uuidv4 from "uuid/v4";
import Jimp from "jimp";
import BlobDTO from "../../Shared/DTO/Blob/BlobDTO.js";

let upload_path = process.env.UPLOAD_PATH || CONFIG.UPLOAD_PATH
let saveBlobToFile = async ({ blob }) => {
  let newUid = uuidv4();

  switch (blob.type) {
    case "image/jpeg": {
      let fd = await fs.open(`${upload_path}/${newUid}.jpg`, "w+");
      let result = await fs.write(fd, new Buffer(blob.blob, "base64"));
      await fs.close(fd);

      return {
        path: `${upload_path}/${newUid}.jpg`,
        uid: newUid,
        filename: `${newUid}.jpg`
      };
      break;
    }
    case "image/png": {
      let fd = await fs.open(`${upload_path}/${newUid}.png`, "w+");
      let result = await fs.write(fd, new Buffer(blob.blob, "base64"));
      await fs.close(fd);

      return {
        path: `${upload_path}/${newUid}.png`,
        uid: newUid,
        filename: `${newUid}.png`
      };
      break;
    }
    default:
      throw new ServerException();
  }
};

/**
 *
 * @export
 * @class BlobService
 * @extends BaseService
 */
export default class BlobService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork, blobRepositoryDI:BlobRepository}}
   */
  constructor({ unitOfWorkDI, blobRepositoryDI }) {
    super({ unitOfWorkDI, repository: 'blobRepository' });
  }

  /**
   * Save blob to file , create thumbmail save into database
   *
   * @param {*} { blob }
   * @returns
   * @memberof BlobService
   */
  async uploadImage({ blob }) {
    let newBlob = {};
    try {
      newBlob = await saveBlobToFile.bind(this)({ blob });
      let imgNormal = await Jimp.read(newBlob.path);
      await imgNormal
        .contain(350, 350) // resize
        .quality(60) // set JPEG quality
        .writeAsync(`${upload_path}/${newBlob.uid}-min.png`); // save

      let blob_id = this.insertFile({
        uid: blob.uid,
        path: newBlob.path,
        fileName: newBlob.filename
      });
      let uid_min = uuidv4()
      let blob_min_id = this.insertFile({
        uid: uid_min,
        path: `${upload_path}/${newBlob.uid}-min.png`,
        fileName: `${newBlob.uid}-min.png`
      });

      return {
        blob_id: await blob_id,
        blob_min_id: await blob_min_id
      };
      ///write to db
    } catch (exception) {
      console.log(exception);
    } finally {
      await fs.unlink(`${newBlob.path}`);
      await fs.unlink(`${upload_path}/${newBlob.uid}-min.png`);
    }
  }


  /**
   *save  file in database
   *
   * @param {*} { uid, path, fileName }
   * @returns
   * @memberof BlobService
   */
  async insertFile({ uid, path, fileName }) {
    let result = await this.unitOfWorkDI.blobRepository.insertFile({
      uid: uid,
      path: path,
      name: fileName
    });
    return result[0].id;
  }

  /**
   *Uplod user image profile , only one per user
   *
   * @param {*} { blob, userId }
   * @memberof BlobService
   */
  async uploadUserImage({ blob }) {
    await this.uploadImageAndSave({ blob, itemId: null })

  }

  async uploadImageAndSave({ blob, itemId }) {
    let getUsersBlob = await this.getBlobs({
      userId: this.userId,
      itemId: itemId
    });

    /*  if (getUsersBlob.length > 0) {
        let delItems = getUsersBlob.map(async item => {
          await this.delete({ model: item });
        });
        await Promise.all(delItems);
      }*/

    let newImages = await this.uploadImage({ blob });
    let result = {
      blob_id: newImages.blob_id,
      blob_thumbmail_id: newImages.blob_min_id,
      user_id: this.userId,
      item_id: itemId == null ? undefined : itemId,
      order: getUsersBlob.length + 1,
      status: 0
    };
    await this.unitOfWorkDI.blobRepository.insert({ model: result });
  }


  /**
   *Get users stream
   *
   * @param {*} { uid }
   * @returns
   * @memberof BlobService
   */
  async getBlobsBase64ByGuids({ uids }) {
    let result = await this.unitOfWorkDI.blobRepository.getByGuids({ uids });
    return result.map(element => {
      switch (element.type) {
        case "jpg": {
          element.type = "image/jpeg";
          return element;
        }
        case "png": {
          element.type = "image/png";
          return element;
        }
      }
    });
  }

  /**
   *Get blobs from user or item with uid
   *
   * @param {*} { userId, itemId }
   * @returns
   * @memberof BlobService
   */
  async getBlobs({ userId, itemId }) {
    return await this.toJsonParse(
      this.unitOfWorkDI.blobRepository.getBlobs({
        userId,
        itemId
      })
    );
  }

  async getUnverified({ pagination }) {
    return await this.toJsonParse(
      this.unitOfWorkDI.blobRepository.getUnverified({
        pagination
      })
    );
  }
  async verifyImage({ blob }) {
    return await this.unitOfWorkDI.blobRepository.verifyImage({
        blob
      })

  }

}
