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
   * elasticSearchServiceDI:ElasticSearchService}}
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
    elasticSearchServiceDI
  }) {
    // @ts-ignore
    super({
      logFileInfrastructureDI,
      authInfrastructureDI,
      dbTransactionInfrastuctureDI,
      validationInfrastructureDI
      
    });
    this.itemServiceDI = itemServiceDI;
    this.blobServiceDI = blobServiceDI;
    this.categoryServiceDI = categoryServiceDI;
    this.elasticSearchServiceDI=elasticSearchServiceDI;
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
      clobs[item] += this.model.name + ";";
      clobs[item] += this.model.description + ";";;
      this.model.catOptions.filter(cat => {
        // console.log(this.model.catOptions);
        // console.log(cat);
        return ['SINGLE', 'SELECT', 'MULTISELECT', 'GEO'].includes(cat.type)
      }).forEach(cat => {
        //console.log(cat)
        console.log(cat.catOption);
        if ((cat.catOption ? cat.catOption.is_not_in_clob : false) != true) {
          clobs[item] += (cat.select ? cat.select["value_" + item] : cat.val) + ";"

        }
      })
    })
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
  async action() {
    // console.log(this.model);
    let clobs = this.createSearchClob.bind(this)();
    this.getCategoriesValue.bind(this)();

    let item = await this.itemServiceDI.insert({ model: this.model });
    let array = this.model.catOptions.map(item => {
      return this.itemServiceDI.upsertCategoryOption({ model: item, item_id: this.model.id })
    })
    await Promise.all(array)
    await this.insertBlobs(item.id);
    await this.elasticSearchServiceDI.upsertDoc({item_id:item.id,longitude:item.longitude,latitude:item.latitude,user_id:item.user_id,clobs:clobs});
    //await this.insertCategories(item.id);

    //  console.log(categories);
    //  this.itemServiceDI.auth(this.authData);
    //  return categories;
  }
}
