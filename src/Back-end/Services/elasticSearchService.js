// @ts-nocheck

import bcrypt from "bcryptjs";
import uuidv4 from "uuid/v4";
import BaseService from "../Architecture/baseService.js";
import UserDTO from "../../Shared/DTO/User/UserDTO.js";
import UnitOfWork from "../unitOfWork.js";
import ServerException from "../Architecture/Exceptions/serverException.js";
import UserRepository from "../Repository/userRepository.js";
import UserRegisterInternalDTO from "../../Shared/DTO/User/UserRegisterInternalDTO.js";
import UserLoginInternalDTO from "../../Shared/DTO/User/UserLoginInternalDTO.js";
import jwt from "jsonwebtoken";
import fs from "fs";
import CONFIG from "../config.js";
import axios from 'axios'




/**
 *
 * @export
 * @class UserService
 * @extends BaseService
 */
export default class ElasticSearchService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork}}
   */
  constructor({ unitOfWorkDI, itemRepositoryDI }) {
    super({ unitOfWorkDI });
    this.itemRepositoryDI = itemRepositoryDI;
  }
  /**
     * 
     * @param {{ model: UserRegisterInternalDTO}}
     * @return {Promise<any>}
   
     */

  async upsertItemDoc({ item_id,
    clobs,
    longitude,
    latitude,
    user_id,
    catOptions,
    description,
    title,
    tags,
    status,
    type,
    category, categories, created_at, expired_at }) {
    console.log(JSON.stringify(catOptions, true))

    let singleGeo = catOptions.filter(item => {
      return item.type == 'SINGLE'
    }).map(item => {
      var value = {};
      // value[item.catOption.cat_opt_type_template.type] = ['float', 'long'].includes(item.catOption.cat_opt_type_template.type) ? parseFloat(item.val) : item.val
      value = item.val;
      return {
        cat_opt_id: item.cat_opt_id,
        type: item.type,
        dataType: item.catOption.cat_opt_type_template.type,
        order: item.catOption.cat_opt_type_template.order,
        cat_opt_temp_id: item.catOption.id,
        co_id: item.co_id,
        value: value,
        conc: item.cat_opt_id + ";" + String(value)
      }

    })

    let singleSELECT = catOptions.filter(item => {
      return ['SELECT', 'MULTI_SELECT'].includes(item.type)
    }).map(item => {
      var value = {};
      value = {
        "pl": item.select["value_pl"],
        "us": item.select["value_us"],
        "no": item.select["value_no"],
        "es": item.select["value_es"],
        "ru": item.select["value_ru"],
        "fr": item.select["value_fr"],
        "zh_cn": item.select["value_zh_cn"],
        "de": item.select["value_de"]
      }
      return {

        cat_opt_id: item.cat_opt_id,
        type: item.type,
        dataType: item.select.cat_opt_type_template.type,
        order: item.select.cat_opt_type_template.order,
        cat_opt_temp_id: item.select.id,
        co_id: item.co_id,
        value: value
      }

    })

    let categoriesArray = categories.map(item => {
      return {
        id: item.id, category: {
          "pl": item.category_pl,
          "us": item.category_us,
          "no": item.category_no,
          "es": item.category_es,
          "ru": item.category_ru,
          "fr": item.category_zh_cn,
          "zh_cn": item.category_zh_cn,
          "de": item.category_de


        }
      }
    });

    let data = {
      "location": [longitude, latitude],

      "user_id": user_id,
      "title": title,
      "description": description,
      "clob": clobs,
      "status": status,
      "created_at": created_at,
      "expired_at": expired_at,
      "tags": tags.map(item => {
        return {
          tag: item.label
        }
      }),
      "single": singleGeo,
      "select": singleSELECT,
      "type": type,
      "categories": categoriesArray,
      "category": {
        "id": category,
      }
    };
    console.log(JSON.stringify(data))
    let result = await axios({
      method: 'post',
      url: CONFIG.ELASTIC_SEARCH[process.env.NODE_ENV ? process.env.NODE_ENV : 'development'] + `items/_doc/${item_id}?refresh`,
      data: data
    })
    return this.itemRepositoryDI.setAsSyncElastic({ id: item_id })
  }

  async deleteDoc({ user_id }) {

  }
  async searchDoc({ latitude, user_id, longitude, text, distance, tags, select, created_at, categories, itemType, expired_at }) {

    let fullText = text ? text : "";
    console.log(fullText);
    let userGuid = user_id;
    let radius = distance;
    if (distance == 'all') {
      radius = '1000km'
    }
    let tagsTerms = null;
    if (tags != undefined) {
      tagsTerms = tags.length > 0 ? (tags.map(item=>{
        return   {
          "nested": {
              "path": "tags", "query": {
                "match": { "tags.tag": { "query": item, "fuzziness": 0,"operator": "and", } }
              }}
    
};
      })) : [null];
    }

    let selectOptions = null;
    if (select != undefined) {
      selectOptions = select.length > 0 ? {
        "terms_set": {
          "select.cat_opt_id.keyword": {
            "terms": select,
            "minimum_should_match_script": {
              "source": "params.num_terms"
            }
          }
        }
      } : null;
    }
    let categoriesJson = null;
    if (categories != undefined) {
      categoriesJson = categories.length > 0 ? {
        "terms_set": {
          "categories.id.keyword": {
            "terms": [
              "da59e7e0-a91a-455e-af12-a937ba24a570"
            ],
            "minimum_should_match_script": {
              "source": "params.num_terms"
            }
          }
        }
      } : null;
    }
    let userJson = user_id != undefined ? {
      "term": {
        "user_id": {
          "value": user_id
        }
      }
    } : null
    let textArray = text != undefined ?
      {
        "function_score": {
          "query": {
            "bool": {
              "should": [
                { "match": { "title": { "query": String(text), "operator": "and", "boost": 70.0, "fuzziness": 1 } } },
                { "match": { "title": { "query": String(text), "operator": "and", "boost": 30.0, "fuzziness": 4 } } },
                { "match": { "title": { "query": String(text), "operator": "or", "boost": 10.0, "fuzziness": 2 } } },
                { "match": { "description": { "query": String(text), "operator": "and", "boost": 30.0, "fuzziness": 3 } } },
                { "match": { "description": { "query": String(text), "operator": "and", "boost": 10.0, "fuzziness": 5 } } },
                {
                  "nested": {
                    "path": "clob",
                    "query": {
                      "match": { "clob.pl": { "query": String(text),"operator": "and", "fuzziness": 2, "boost": 20.0 } }
                    }
                  }
                },
                {
                  "nested": {
                    "path": "tags", "query": {
                      "match": { "tags.tag": { "query": String(text),"operator": "and", "fuzziness": 2, "boost": 40.0 } }
                    }
                  }
                },
                { "match": { "select.value.pl": String(text) } },
                { "match": { "categories.category.pl": String(text) } },
                {
                  "multi_match": {
                    "query": String(text),
                    "type": "cross_fields",
                    "fields": ["title^10", "description^2", "clob." + this.context.language, "tags.tag", "select.value." + this.context.language, "categories.category." + this.context.language],
                    "operator": "and"

                  }
                }

              ]
            }
          },
          "script_score": {
            "script": "(10.0 * _score > 10)?_score:0"
          },
          "score_mode": "sum",
          "min_score": 10
        }
      } : null


    let body = {
      "stored_fields": [
        "doc._id",
        "doc._source",

      ],
      "_source": ["user_id,categories"],

      "aggregations": {
        "cat_Options": {
           "terms": {
              "field": "select.cat_opt_id.keyword"
            
           }
        },
        "categories": {
           "terms": {
              "field": "categories.id.keyword"
            
           }
        },
         "tags": {
           "terms": {
              "field": "tags.tag.keyword"
            
           }
        }
     },
      "query": {
        "bool": {
          "must": [
            textArray,
           // ...tagsTerms,
            selectOptions,
            categoriesJson,
            userJson,
        /*    {
              "script": {
                "script": {
                  "source": "def value=Double.parseDouble(params.value);for (def item : doc['single.conc.keyword']){def val = item.indexOf(';');def id = item.substring(0,val) ;def values =item.replace(id+';','') ;def dblValue=Double.parseDouble(values);if(id==params.uid && ((params.operator =='gtl' && dblValue >= value) || (params.operator =='ltr'&& dblValue <= value))){return true}} return false;",
                  "params": {
                    "uid": "1907c124-f3fa-4072-8da6-f0568e2c5071",
                    "operator": "gtl",
                    "value": "49.8"
                  }
                }
              }
            }*/

          ].filter(item => { return item != null }),
          "filter": [
            {
              "geo_distance": {
                "distance": radius,
                "location": {
                  "lat": latitude,
                  "lon": longitude
                }
              }
            },
            {
              "bool": {
                "must": [
                  {
                    "range": {
                      "created_at": {
                        "gte": "2019-09-11"
                      }
                    }
                  }
                ]
              }
            }
          ]
        }
      }


    }
    console.log(JSON.stringify(body));
    return await axios({
      method: 'post',
      url: CONFIG.ELASTIC_SEARCH[process.env.NODE_ENV ? process.env.NODE_ENV : 'development'] + `items/_search`,
      data: body

    })
  }
}
