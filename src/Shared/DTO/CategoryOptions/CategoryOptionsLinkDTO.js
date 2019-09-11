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
        this.is_on_pin_map = false
        this.is_on_map = false
        this.is_form_hidden=false;
    }
    validation(state) {

     


        //validator(state.surname).display("surname").isString()

        return validator.run();
    };
}
