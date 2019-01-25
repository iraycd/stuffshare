import CodeDictionary from "../Dictionary/codeDictionary";

"use strict";


export default class ValidationException  {
    constructor() {
   
        this.failed='',
        this.path=[],
        this.rule=()=>{};
        this.value='';

    };
    throw ({ field, code }, ...param) {
        this.failed=code,
        this.path=[field]
        this.rule="";
        this.value=param;
        const dictResult = new CodeDictionary().get(code,"VALIDATION", param);
        this.status = dictResult.status;
        this.msg = dictResult.message;
        this.dictionaryDI=undefined;
        throw this;
    }
};

