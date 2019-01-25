"use strict";

import BaseDTO from '../../BaseObjects/baseDTO';
import Validator from 'better-validator';

export default class CategoryDTO extends BaseDTO {
  constructor() {
    super();
    this.id = 0;
    this.category = '';
    this.category_pl = '';
    this.category_us = '';
    this.category_children = [];
    this.category_parent = '';
    this.status =0;
    this.CategoryHierarchy = {
      category_parent_id:0
    };
  };

}
