import BaseQuery from '../../Architecture/baseQuery.js';
import DictionaryDTO from '../../../Shared/DTO/Dictionary/DictionaryDTO.js';
import CodeDictionary from '../../Architecture/Dictionary/codeDictionary.js';

CodeDictionary
export default class GetDictionariesQuery extends BaseQuery {

    constructor({ logFileInfrastructureDI }) {
        super({ logFileInfrastructureDI });

    };
    init(dto) {
        this.model = Object.assign(new DictionaryDTO(), dto);;
    }

    async action() {
        let result = {};

        result = new CodeDictionary().get('', '');
        return await result;
    }
};
