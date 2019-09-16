import BaseCommand from "../../Architecture/baseCommand.js";
import DictionaryDTO from "../../../Shared/DTO/Dictionary/DictionaryDTO.js";
import LogFileInfrastructure from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import AuthInfrastucture from "../../Architecture/Infrastructure/authInfrastucture.js";
import DbTransactionInfrastucture from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import ItemService from "../../Services/itemService.js";
import ItemDTO from "./../../../Shared/DTO/Item/ItemDTO.js";
import BlobService from "../../Services/blobService.js";
import CategoryService from "../../Services/categoryService.js";
import BlobValidators from "../../Validators/blobValidators.js";
import BlobBase64DTO from "../../../Shared/DTO/Blob/BlobBase64DTO.js";
import Promise from "bluebird";
import ElasticSearchService from "../../Services/elasticSearchService.js";
import TagService from './../../Services/tagService.js'
import uuidv4 from "uuid/v4";
import ClosingInfrastructure from "../../Architecture/Infrastructure/closingInfrastructure.js";

("use strict");

export default class CreateItemCommand extends BaseCommand {
  /**
   * Creates an instance of CreateItemCommand.
   * @param   {{ logFileInfrastructureDI:LogFileInfrastructure ,
   * authInfrastructureDI:AuthInfrastucture,
   * dbTransactionInfrastuctureDI:DbTransactionInfrastucture,
   * itemServiceDI:ItemService,
   * blobServiceDI:BlobService,
   * categoryServiceDI:CategoryService,
   * elasticSearchServiceDI:ElasticSearchService,
   * tagServiceDI:TagService,
   * closingInfrastructureDI:ClosingInfrastructure}}
   * @memberof CreateItemCommand
   */
  constructor({
    logFileInfrastructureDI,
    authInfrastructureDI,
    dbTransactionInfrastuctureDI,
    itemServiceDI,
    validationInfrastructureDI,
    categoryServiceDI,
    blobServiceDI,
    elasticSearchServiceDI,
    tagServiceDI,
    closingInfrastructureDI
  }) {
    // @ts-ignore
    super({
      logFileInfrastructureDI,
      authInfrastructureDI,
      dbTransactionInfrastuctureDI,
      validationInfrastructureDI,
      closingInfrastructureDI

    });
    this.itemServiceDI = itemServiceDI;
    this.blobServiceDI = blobServiceDI;
    this.categoryServiceDI = categoryServiceDI;
    this.elasticSearchServiceDI = elasticSearchServiceDI;
    this.tagServiceDI = tagServiceDI;
    this.clobs = {}
  }

  get validation() {
    let funcList = [];
    /* this.model.blobs.forEach(item => {
       let blob = Object.assign(new BlobBase64DTO(), item);
       funcList.push(() => {
         return BlobValidators.checkUploadedFileType.bind(this)(blob);
       });
       funcList.push(() => {
         return BlobValidators.getSizeOfUplodedFile.bind(this)(blob);
       });
     });*/
    return funcList;
  }
  init(dto) {
    this.model = Object.assign(new ItemDTO(), dto);
    this.model.is_elastic_sync = false;

  }

  async insertCategories(itemId) {
    let categoriesNew = this.model.categories.filter(item => {
      return item.id == undefined || item.id == null;
    });
    let catPromises = categoriesNew.map(async item => {
      return await this.categoryServiceDI
        .setContext(this.context)
        .newCategory({ model: item });
    });
    let result = await Promise.all(catPromises);
    let categories = [];
    result.forEach(item => {
      categories.push(item);
    });
    this.model.categories.forEach(item => {
      if (item.id != undefined && item.id != null) {
        categories.push(item);
      }
    });
    await Promise.mapSeries(categories, categoryElement => {
      return this.itemServiceDI
        .setContext(this.context)
        .insertCategories({ itemId: itemId, categoryId: categoryElement.id });
    });
  }
  async insertBlobs(itemId) {
    await Promise.mapSeries(this.model.blobs, item => {
      return this.blobServiceDI.setContext(this.context).uploadImageAndSave({
        blob: item,
        itemId: itemId
      });
    });
  }

  createSearchClob(itemId) {
    let clobs = {
      pl: "",
      us: "",
      de: "",
      ru: "",
      fr: "",
      es: "",
      no: "",
      zh_cn: ""
    }
    Object.keys(clobs).forEach(item => {
      //clobs[item] += this.model.name + ";";
      // clobs[item] += this.model.description + ";";;
      this.model.catOptions.filter(cat => {
        // console.log(this.model.catOptions);
        // console.log(cat);
        return ['SINGLE', 'SELECT', 'MULTISELECT', 'GEO'].includes(cat.type)
      }).forEach(cat => {
        //console.log(cat)
        console.log(cat.catOption);
        if ((cat.catOption ? cat.catOption.is_not_in_clob : false) != true) {
          clobs[item] += (cat.select ? cat.select["value_" + item] : cat.val) + " ; "

        }
      })
      this.model.tags.forEach(tag => {
        clobs[item] += tag.label + ' ; ';
      })
    })
    console.log(clobs)
    Object.keys(clobs).forEach(item => {
      this.model["clobSearch_" + item] = clobs[item];
    })
    //console.log(clobs)
    this.model.user_id = this.context.user.id;
    //this.model.clobSearch_us = clob_us;
    //this.model.clobSearch_pl = clob_pl;
    return clobs;
    //ADD CATEGORIES NAME TOO
    //ADD HASH TAGS
  }

  async elasticClosingFunc() {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var expired = new Date(Date.now() + 12096e5);
    var dateExpired = expired.getFullYear()+'-'+(expired.getMonth()+1)+'-'+expired.getDate();

    return await this.elasticSearchServiceDI.upsertItemDoc({
      item_id: this.model.id,
      longitude: this.model.longitude,
      latitude: this.model.latitude,
      user_id: this.model.user_id,
      clobs: this.clobs,
      title: this.model.name,
      description: this.model.description,
      catOptions: this.model.catOptions,
      status: this.model.status,
      type: this.model.type,
      category: this.model.category_id,
      tags: this.model.tags,
      categories:this.model.categories,
      created_at:this.model.created_at?this.model.created_at:today.toISOString(),
      expired_at:this.model.expired_at?this.model.expired_at:expired.toISOString()

    });


  }

  getCategoriesValue() {
    let catOptions = this.model.catOptions.filter(cat => {
      return cat.type == 'GEO';
    });

    this.model.latitude = catOptions.length > 0 ? catOptions.filter(item => { return item.catOption.order == 2 })[0].val : null
    this.model.longitude = catOptions.length > 0 ? catOptions.filter(item => { return item.catOption.order == 1 })[0].val : null

    this.model.blobs = this.model.catOptions.filter(cat => {
      return cat.type == 'IMAGE';
    }).map(item => { return item.content });


  }
  async tagsInsert() {

    let existTagsArray = this.model.tags.filter(item => {
      return item.id != undefined
    })
    let newTags = this.model.tags.filter(item => {
      return item.id == undefined
    })
    newTags = newTags.map(item => {
      item.id = uuidv4()
      return item
    })
    let idNewTagsArray = await this.tagServiceDI.insertUniq({ newTags: newTags });



    let tagsId = [];
    idNewTagsArray.forEach(item => {


      tagsId.push(item);
    })
    existTagsArray.forEach(item => {

      tagsId.push(item.id);
    })

    let tagsArray = await tagsId.map(tag => {
      console.log(tag);
      return this.itemServiceDI.insertTag({
        item_id: this.model.id, tag_id: tag
      })
    })

    await Promise.all(tagsArray);
  }
  async action() {
    // console.log(this.model);
    this.clobs = this.createSearchClob.bind(this)();
    this.getCategoriesValue.bind(this)();
    let newItem = await this.itemServiceDI.upsert({ model: this.model });
    let array = this.model.catOptions.map(item => {
      return this.itemServiceDI.upsertCategoryOption({ model: item, item_id: this.model.id })
    })
    this.model.categories = await this.categoryServiceDI.getCategoriesParents({ ids: this.model.category_id })
    await Promise.all(array)
    await this.tagsInsert();
    await this.insertBlobs(this.model.id);
    this.closingInfrastructureDI.addClosingFunction(
      this.elasticClosingFunc.bind(this)
    )
    //await this.insertCategories(item.id);

    //  console.log(categories);
    //  this.itemServiceDI.auth(this.authData);
    //  return categories;
  }
}
