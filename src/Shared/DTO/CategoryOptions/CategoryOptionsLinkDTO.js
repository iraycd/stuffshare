import BaseDTO from "../../BaseObjects/baseDTO";
import Validator from 'better-validator';


export default class CategoryOptionsLinkDTO extends BaseDTO {
    constructor() {
        super();
        this.id = '';
        this.co_id = '';
        this.category_id = '';
        this.order = '';
        this.is_searchable = ''
        this.is_require = ''
        this.limit_of = ''
    }
    validation(state) {

     


        //validator(state.surname).display("surname").isString()

        return validator.run();
    };
}
