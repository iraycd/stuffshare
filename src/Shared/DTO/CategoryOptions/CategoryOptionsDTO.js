import BaseDTO from "../../BaseObjects/baseDTO";
import Validator from 'better-validator';


export default class CategoryOptionsDTO extends BaseDTO {
    constructor() {
        super();
        
        this.cot_id='';
        this.category_id='';
        this.type='';
        this.name='';
        this.name_pl='';
        this.name_us='';
        this.name_de='';
        this.name_ru='';
        this.name_fr='';
        this.name_es='';
        this.name_no='';
        this.name_zh_cn='';
        this.status='';
        this.order='';
    }
    validation(state) {
        const validator = new Validator();
        validator(state.name).display("name").isString().notEmpty();
        validator(state.name_pl).display("name_pl").isString().notEmpty();
        validator(state.name_us).display("name_us").isString().notEmpty();
        validator(state.name_de).display("name_de").isString().notEmpty();
        validator(state.name_ru).display("name_ru").isString().notEmpty();
        validator(state.name_fr).display("name_fr").isString().notEmpty();
        validator(state.name_es).display("name_es").isString().notEmpty();
        validator(state.name_no).display("name_no").isString().notEmpty();
        validator(state.name_zh_cn).display("name_zh_cn").isString().notEmpty();
        validator(state.type).display("type").isString().notEmpty();
        validator(state.cateogry_id).display("cateogry_id").isString().notEmpty();
        validator(state.cot_id).display("cot_id").isString().notEmpty();

        //validator(state.surname).display("surname").isString().notEmpty();

        return validator.run();
    };
}
