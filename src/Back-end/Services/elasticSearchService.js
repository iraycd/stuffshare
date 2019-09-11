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
  constructor({ unitOfWorkDI, userRepositoryDI }) {
    super({ unitOfWorkDI });
  }
  /**
     * 
     * @param {{ model: UserRegisterInternalDTO}}
     * @return {Promise<any>}
   
     */

  async upsertDoc({ item_id, clobs, longitude, latitude, user_id }) {
    return await axios({
      method: 'post',
      url: CONFIG.ELASTIC_SEARCH[process.env.NODE_ENV ? process.env.NODE_ENV : 'development'] + `items/_doc/${item_id}?refresh`,
      data: {
        "location": [longitude, latitude],
        "name_pl": clobs["pl"],
        "name_us": clobs["us"],
        "name_de": clobs["de"],
        "name_no": clobs["no"],
        "name_es": clobs["es"],
        "name_ru": clobs["ru"],
        "name_fr": clobs["fr"],
        "name_zh_cn": clobs["zh_cn"],
        "user_id": user_id
      }
    })
  }

  async deleteDoc({ user_id }) {

  }
  async searchDoc({ latitude, user_id, longitude, text ,distance}) {

    let fullText=text?text:"";
    let userGuid=user_id;
    let radius=distance;
    if(distance=='all')
    {
      radius='1000000km'
    }
    let fulltextArray = eval(`[
      {
        "filter": {
          "match": {
            "name_${this.context.language}": {
              "query": "",
              "operator": "or",
              "fuzziness": "0"
            }
          }
        },
        "weight": 10
      },
      {
        "filter": {
          "match": {
            "name_${this.context.language}": {
              "query": "",
              "operator": "and",

              "fuzziness": "3"
            }
          }
        },
        "weight": 20
      }, {
        "filter": {
          "match": {
            "name_${this.context.language}": {
              "query": "",
              "operator": "and",

              "fuzziness": "1"
            }
          }
        },
        "weight": 40
      },

      {
        "filter": {
          "match": {
            "name_${this.context.language}": {
              "query":"",
              "operator": "and",
              "fuzziness": "0"
            }
          }
        },
        "weight": 60
      }
    ]`)
    fulltextArray=fulltextArray.map(item=>{
      item.filter.match["name_"+this.context.language].query=fullText;
      return item;
    })
    let body = {
      "stored_fields":[  
        "doc._id",
        "doc._source"
  
     ],
     "_source": ["user_id"],
  
      "query": {
        "function_score": {
          "query": {
            "bool": {
              "must": {
                "match_all": {}
              },
              "filter": {
                "geo_distance": {
                  "distance": radius,
                  "location": {
                    "lat": latitude,
                    "lon": longitude
                  }
                }
              }
            }
          },
          "boost": "5",
          "functions": fulltextArray,
          "max_boost": 60,
          "score_mode": "max",
          "boost_mode": "multiply",
          "min_score": 5
        }
      }
    }
    return await axios({
      method: 'post',
      url: CONFIG.ELASTIC_SEARCH[process.env.NODE_ENV ? process.env.NODE_ENV : 'development'] + `items/_search`,
      data:  body
      
    })
  }
}
