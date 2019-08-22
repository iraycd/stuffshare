// @ts-nocheck
"use strict";
import awilix from "awilix";
import CategoryService from "./Services/categoryService.js";
import CategoryRepository from "./Repository/categoryRepository.js";
import UserRepository from "./Repository/userRepository.js";
import UserService from "./Services/userService.js";
import UnitOfWork from "./unitOfWork.js";
import CommandList from "../Shared/CommandList.js";
import GetCategoryQuery from "./Query/Category/getCategoryQuery.js";
import AddToDictionaryCommand from "./Commands/Dictionary/addToDictionaryCommand.js";
import RemoveDictionaryCommand from "./Commands/Dictionary/removeDictionaryCommand.js";
import CreateUserCommand from "./Commands/User/createUserCommand.js";
import InsertCategoryCommand from "./Commands/Category/insertCategoryCommand.js";
import GetDictionariesQuery from "./Query/Dictionary/getDictionariesQuery.js";
import QueryList from "../Shared/QueryList.js";
import ContainerAwlix from "./Architecture/awilixContainer.js";
import GetCategoryTreeQuery from "./Query/Category/getCategoryTreeQuery.js";
import CategoryHierarchyRepository from "./Repository/categoryHierarchyRepository.js";
import UserLogInInternalQuery from "./Query/User/userLogInInternalQuery.js";
import LogInByRefreshTokenQuery from "./Query/User/logInByRefreshTokenQuery.js";
import AuthorizeUserCommand from "./Commands/User/authorizeUserCommand.js";
import GenRefreshTokenCommand from "./Commands/User/genRefreshTokenCommand.js";
import LogOutCommand from "./Commands/User/logOutCommand.js";
import GetRefreshTokenQuery from "./Query/User/getRefreshTokenQuery.js";
import SequelizeDB from "./Database/models/index.js";
import ChangePasswordCommand from "./Commands/User/changePasswordCommand.js";
import ForgotPasswordCommand from "./Commands/User/forgotPasswordCommand.js";
import RemoveUserCommand from "./Commands/User/removeUserCommand.js";
import UploadImageCommand from "./Commands/Blob/uploadImageCommand.js";
import BlobRepository from "./Repository/blobRepository.js";
import BlobService from "./Services/blobService.js";
import SendMailForgotPasswordCommand from "./Commands/User/sendMailForgotPasswordCommand.js";
import BlobMapperRepository from "./Repository/blobMapperRepository.js";
import GetBlobsBase64ByGuidsQuery from "./Query/Blob/getBlobsBase64ByGuidsQuery.js";
import RemoveBlobCommand from "./Commands/Blob/removeBlobCommand.js";
import GetUserImagesQuery from "./Query/Blob/getUserImagesQuery.js";
import SetLanguageCommand from "./Commands/User/setLanguageCommand.js";
import SetCoordinatesCommand from "./Commands/User/setCoordinatesCommand.js";
import ItemCategoryRepository from "./Repository/itemCategoryRepository.js";
import ItemService from "./Services/itemService.js";
import ItemRepository from "./Repository/itemRepository.js";
import CreateItemCommand from "./Commands/Item/createItemCommand.js";
import GetItemQuery from "./Query/Item/getItemQuery.js";
import EditItemCommand from "./Commands/Item/editItemCommand.js";
import SetAsVerifiedCommand from "./Commands/Category/setAsVerifiedCommand.js";
import TextRepository from './Repository/textRepository.js'
import SearchItemQuery from "./Query/Item/searchItemQuery.js";
import GetUserInfoQuery from "./Query/User/getUserInfoQuery.js";
import CountryRepository from "./Repository/countryRepository.js";
import CountryService from "./Services/countryService.js";
import GetCountriesQuery from "./Query/Country/getCountriesQuery.js";
import CityRepository from "./Repository/cityRepository.js";
import CityService from "./Services/cityService.js";
import GetCitiesQuery from "./Query/City/getCitiesQuery.js";
import GetUnverifiedBlobsQuery from "./Query/Blob/getUnverifiedBlobsQuery.js";
import VerifyImageCommand from "./Commands/Blob/verifyImageCommand.js";
import SetProfileImageCommand from "./Commands/User/setProfileImageCommand.js";
import CreateUserByExternalCommand from "./Commands/User/createUserByExternalCommand.js";
import UserAuthRepository from "./Repository/userAuthRepository.js";
import LogInByExternalQuery from "./Query/User/logInByExternalQuery.js";
import GetCategoryFreetextQuery from "./Query/Category/getCategoryFreetextQuery.js";
import GetCategoriesAllQuery from "./Query/Category/getCategoriesAllQuery.js";
import DeleteCategoryCommand from "./Commands/Category/deleteCategoryCommand.js";
import SetParentCategoryCommand from "./Commands/Category/setParentCategoryCommand.js";
import EditCategoryCommand from "./Commands/Category/editCategoryCommand.js";
import CategoryOptionsRepository from "./Repository/categoryOptionsRepository.js";
import GetCategoryOptionsTypeQuery from "./Query/CategoryOptions/getCategoryOptionsTypeQuery.js";
import CategoryOptionService from "./Services/categoryOptionService.js";
import UpsertCategoryOptionsCommand from "./Commands/CategoryOptions/upsertCategoryOptionsCommand.js";
import GetCategoryOptionsQuery from "./Query/CategoryOptions/getCategoryOptionsQuery.js";
import DeleteCategoryOptionsCommand from "./Commands/CategoryOptions/deleteCategoryOptionsCommand.js";
import UpsertCategoryOptionsTemplateCommand from "./Commands/CategoryOptions/upsertCategoryOptionsTemplateCommand.js";
import DeleteCategoryOptionsTemplateCommand from "./Commands/CategoryOptions/deleteCategoryOptionsTemplateCommand.js";
import ReverseGeocodeQuery from "./Query/City/reverseGeocodeQuery.js";
import GeocodeQuery from "./Query/City/geocodeQuery.js";
import GetCountriesByIdQuery from "./Query/Country/getCountriesByIdQuery.js";
import GetAllCategoriesOptionQuery from "./Query/CategoryOptions/getAllCategoryOptionsQuery.js";
import DeleteCategoryOptionsForCategoryCommand from "./Commands/CategoryOptions/deleteCategoryOptionsForCategoryCommand.js";
import UpsertCategoryOptionsForCategoryCommand from "./Commands/CategoryOptions/upsertCategoryOptionsForCategoryCommand.js";






/**
 * 
 */
const { asValue, asFunction, asClass } = awilix;

let exporter = {
  categoryRepositoryDI: asClass(CategoryRepository),
  categoryServiceDI: asClass(CategoryService),
  userRepositoryDI: asClass(UserRepository),
  userServiceDI: asClass(UserService),
  blobRepositoryDI: asClass(BlobRepository),
  blobServiceDI: asClass(BlobService),
  blobMapperRepositoryDI: asClass(BlobMapperRepository),
  categoryHierarchyRepositoryDI: asClass(CategoryHierarchyRepository),
  itemCategoryRepositoryDI: asClass(ItemCategoryRepository),
  itemRepositoryDI: asClass(ItemRepository),
  textRepositoryDI: asClass(TextRepository),
  itemServiceDI: asClass(ItemService),
  unitOfWorkDI: asClass(UnitOfWork, { lifetime: awilix.Lifetime.SCOPED }),
  countryRepositoryDI: asClass(CountryRepository),
  countryServiceDI: asClass(CountryService),
  cityRepositoryDI: asClass(CityRepository),
  cityServiceDI: asClass(CityService),
  categoryOptionsRepositoryDI: asClass(CategoryOptionsRepository),
  categoryOptionServiceDI: asClass(CategoryOptionService),

  userAuthRepositoryDI: asClass(UserAuthRepository),
  sequelizeDI: asValue(SequelizeDB)
};
exporter[CommandList.Dictionary.ADD_DICTIONARY] = asClass(
  AddToDictionaryCommand
);
exporter[QueryList.Dictionary.GET_DICTIONARY] = asClass(GetDictionariesQuery);
exporter[CommandList.Dictionary.REMOVE_DICTIONARY] = asClass(
  RemoveDictionaryCommand
);

///////////////////////USER////////////////////////////////////////
exporter[CommandList.User.CREATE_USER] = asClass(CreateUserCommand);
exporter[CommandList.User.LOG_OUT] = asClass(LogOutCommand);
exporter[CommandList.User.GEN_REFRESH_TOKEN] = asClass(GenRefreshTokenCommand);
exporter[CommandList.User.AUTHORIZE_USER] = asClass(AuthorizeUserCommand);
exporter[CommandList.User.CHANGE_PASSWORD] = asClass(ChangePasswordCommand);
exporter[CommandList.User.FORGOT_PASSWORD] = asClass(ForgotPasswordCommand);
exporter[CommandList.User.REMOVE_USER] = asClass(RemoveUserCommand);
exporter[CommandList.User.FORGOT_PASSWORD_CHECK] = asClass(
  SendMailForgotPasswordCommand
);
exporter[CommandList.User.SET_LANGUAGE] = asClass(SetLanguageCommand);
exporter[CommandList.User.SET_COORDIATES] = asClass(SetCoordinatesCommand);
exporter[CommandList.User.SET_PROFILE_IMAGE] = asClass(SetProfileImageCommand)
exporter[CommandList.User.CREATE_USER_EXTERNAL_PROV] = asClass(CreateUserByExternalCommand)


exporter[QueryList.User.USER_INFO] = asClass(GetUserInfoQuery)
exporter[QueryList.User.LOG_IN_INTERNAL] = asClass(UserLogInInternalQuery);
exporter[QueryList.User.LOG_IN_BY_REFRESH_TOKEN] = asClass(
  LogInByRefreshTokenQuery
);
exporter[QueryList.User.LOGIN_BY_EXTERNAL] = asClass(LogInByExternalQuery)
exporter[QueryList.User.GET_REFRESH_TOKEN] = asClass(GetRefreshTokenQuery);

////////////////////////////////Category/////////////////////////////////////////
exporter[CommandList.Category.ADD_CATEGORY] = asClass(InsertCategoryCommand);
exporter[CommandList.Category.SET_AS_VERIFIED] = asClass(SetAsVerifiedCommand);
exporter[CommandList.Category.DELETE_CATEGORY] = asClass(DeleteCategoryCommand)
exporter[CommandList.Category.SET_PARENT] = asClass(SetParentCategoryCommand)
exporter[CommandList.Category.EDIT_CATEGORY] = asClass(EditCategoryCommand);
exporter[QueryList.Category.GET_CATEGORIES] = asClass(GetCategoryQuery);
exporter[QueryList.Category.GET_CATEGORIES_HIERARCHY] = asClass(
  GetCategoryTreeQuery
);
exporter[QueryList.Category.GET_CATEGORIES_ALL_TREE] = asClass(GetCategoriesAllQuery)

exporter[QueryList.Category.GET_CATEGORIES_FREETEXT] = asClass(GetCategoryFreetextQuery)
///////////////////////////////////////////////////////////////////////////
////////////////////////////////CategoryOptions/////////////////////////////////////////

exporter[QueryList.CategoryOptions.GET_OPTIONS_TYPE] = asClass(GetCategoryOptionsTypeQuery);
exporter[QueryList.CategoryOptions.GET_CATEGORY_OPTION] = asClass(GetCategoryOptionsQuery)
exporter[QueryList.CategoryOptions.GET_ALL_CETEGORIES_OPTIONS] = asClass(GetAllCategoriesOptionQuery);

exporter[CommandList.Category_Options.UPSERT_CATEGORY_OPTIONS] = asClass(UpsertCategoryOptionsCommand);
exporter[CommandList.Category_Options.DELETE_CATEGORY_OPTIONS] = asClass(DeleteCategoryOptionsCommand);
exporter[CommandList.Category_Options.UPSERT_CATEGORY_OPTIONS_TEMPLATE] = asClass(UpsertCategoryOptionsTemplateCommand);
exporter[CommandList.Category_Options.DELETE_CAETEGORY_OPTIONS_FOR_CATEGORY] = asClass(DeleteCategoryOptionsForCategoryCommand);
exporter[CommandList.Category_Options.UPSERT_CAETEGORY_OPTIONS_FOR_CATEGORY] = asClass(UpsertCategoryOptionsForCategoryCommand);
exporter[CommandList.Category_Options.DELETE_CATEGORY_OPTIONS_TEMPLATE] = asClass(DeleteCategoryOptionsTemplateCommand);



///////////////////////////////BLOB//////////////////////////////
exporter[CommandList.Blob.UPLOAD_IMAGE] = asClass(UploadImageCommand);
exporter[CommandList.Blob.REMOVE_BLOB] = asClass(RemoveBlobCommand);
exporter[CommandList.Blob.VERIFY_IMAGE] = asClass(VerifyImageCommand);

exporter[QueryList.Blob.GET_BLOBS_BY_GUIDS] = asClass(
  GetBlobsBase64ByGuidsQuery
);
exporter[QueryList.Blob.GET_USER_IMAGES] = asClass(GetUserImagesQuery);
exporter[QueryList.Blob.GET_UNVERIFIED] = asClass(GetUnverifiedBlobsQuery);
///////////////////////ITEM//////////////////////////////////////
exporter[CommandList.Item.NEW_ITEM] = asClass(CreateItemCommand);
exporter[CommandList.Item.EDIT_ITEM] = asClass(EditItemCommand)

exporter[QueryList.Item.GET_ITEM] = asClass(GetItemQuery);
exporter[QueryList.Item.SEARCH_ITEM] = asClass(SearchItemQuery);



///////////////////COUNTRY////////////////////////////////

exporter[QueryList.Country.GET_COUNTRY] = asClass(GetCountriesQuery);
exporter[QueryList.Country.GET_COUNTRY_BY_ID] = asClass(GetCountriesByIdQuery);


exporter[QueryList.City.GET_CITY] = asClass(GetCitiesQuery);
exporter[QueryList.City.REVERSE_GEO]= asClass(ReverseGeocodeQuery)
exporter[QueryList.City.REVERSE_LATLNG_GEO]= asClass(GeocodeQuery)









///////////////////////////////////////////////////////////
ContainerAwlix.register(exporter);
let container = ContainerAwlix;
export default container;
