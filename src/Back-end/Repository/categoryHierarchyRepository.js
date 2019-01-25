import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js"
/**
 * 
 * @export
 * @class CategoryRepository
 * @extends BaseRepository
 */
export default class CategoryHierarchyRepository extends BaseRepository {
    constructor({sequelizeDI}) {
        super(sequelizeDI.CategoryHierarchy)

    }


}