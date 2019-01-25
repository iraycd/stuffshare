// @ts-nocheck
"use strict";
import BaseDTO from "../../BaseObjects/baseDTO";
import Validator from "better-validator";

export default class ItemDTO extends BaseDTO {
  constructor() {
    super();
    this.name = "";
    this.description = "";
    this.user_id = "";
    this.clobSearch = "";
    this.clobSearch_pl = "";
    this.clobSearch_us = "";
  }
  validation(state) {
  
  }
}
