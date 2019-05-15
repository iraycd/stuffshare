"use strict";

import BaseUnitOfWork from "./Architecture/baseUnitOfWork.js";
import CategoryRepository from "./Repository/categoryRepository.js";
import UserRepository from "./Repository/userRepository.js";
import CategoryHierarchyRepository from "./Repository/categoryHierarchyRepository.js";
import BlobRepository from "./Repository/blobRepository.js";
import BlobMapperRepository from "./Repository/blobMapperRepository.js";
import ItemCategoryRepository from "./Repository/itemCategoryRepository.js";
import ItemRepository from "./Repository/itemRepository.js";
import TextRepository from "./Repository/textRepository.js";
import CountryRepository from "./Repository/countryRepository.js";
import CityRepository from "./Repository/cityRepository.js";
import UserAuthRepository from "./Repository/userAuthRepository.js";


/**
 *
 *
 * @class UnitOfWork
 * @extends {BaseUnitOfWork}
 */
export default class UnitOfWork extends BaseUnitOfWork {

    /**
     * Creates an instance of UnitOfWork.
     * @param  { { categoryRepositoryDI:CategoryRepository,userAuthRepositoryDI: UserAuthRepository,userRepositoryDI : UserRepository,categoryHierarchyRepositoryDI:CategoryHierarchyRepository,blobRepositoryDI:BlobRepository,blobMapperRepositoryDI:BlobMapperRepository,itemRepositoryDI:ItemRepository,itemCategoryRepositoryDI:ItemCategoryRepository, countryRepositoryDI:CountryRepository,cityRepositoryDI:CityRepository}} 
     * @memberof UnitOfWork
     */
    // @ts-ignore
    constructor({ categoryRepositoryDI, userRepositoryDI, categoryHierarchyRepositoryDI, blobRepositoryDI ,blobMapperRepositoryDI,itemCategoryRepositoryDI,itemRepositoryDI,textRepositoryDI,countryRepositoryDI,cityRepositoryDI,userAuthRepositoryDI}) {
        super()

        this.transaction = null;
        this.repositories = {
            textRepositoryDI,
            userRepositoryDI,
            categoryRepositoryDI,
            categoryHierarchyRepositoryDI,
            blobRepositoryDI,
            blobMapperRepositoryDI,
            itemCategoryRepositoryDI,
            itemRepositoryDI,
            countryRepositoryDI,
            cityRepositoryDI,
            userAuthRepositoryDI
        }
    };

    
    /**
     * 
     * @return {UserRepository}
     * @readonly
     * @memberof UnitOfWork
     */
    get userRepository() {
        return this.repositories.userRepositoryDI;
    } 

        /**
     * 
     * @return {UserAuthRepository}
     * @readonly
     * @memberof UnitOfWork
     */
    get userAuthRepository() {
        return this.repositories.userAuthRepositoryDI;
    }

    /**
    * 
    * @return {BlobRepository}
    * @readonly 
    * @memberof UnitOfWork
    */
    get blobRepository() {
        return this.repositories.blobRepositoryDI;
    }
 /**
    * 
    * @return {BlobMapperRepository}
    * @readonly
    * @memberof UnitOfWork
    */
   get blobMapperRepository() {
    return this.repositories.blobMapperRepositoryDI;
}

    /**
     * @return {CategoryHierarchyRepository}
     * @readonly
     * @memberof UnitOfWork
     */
    get categoryHierarchyRepository() {
        return this.repositories.categoryHierarchyRepositoryDI;
    }


    /**
     *  
     * @return {CategoryRepository}
     * @readonly
     * @memberof UnitOfWork
     */
    get categoryRepository() {
        return this.repositories.categoryRepositoryDI;
    }


    /**
     * 
     * @return {ItemRepository}
     * @readonly
     * @memberof UnitOfWork
     */
    get itemRepository() {
        return this.repositories.itemRepositoryDI;
    }


    /**
     * 
     * @return {CountryRepository}
     * @readonly
     * @memberof UnitOfWork
     */
    get countryRepository() {
        return this.repositories.countryRepositoryDI;
    }

   /**
     * 
     * @return {CityRepository}
     * @readonly
     * @memberof UnitOfWork
     */
    get cityRepository() {
        return this.repositories.cityRepositoryDI;
    }   /**


    
    /**
     *  
     * @return {ItemCategoryRepository}
     * @readonly
     * @memberof UnitOfWork
     */
    get itemCategoryRepository() {
        return this.repositories.itemCategoryRepositoryDI;
    }

    /**
     *  
     * @return {TextRepository}
     * @readonly
     * @memberof UnitOfWork
     */
    get textRepository() {
        return this.repositories.textRepositoryDI;
    }
    
  
}

