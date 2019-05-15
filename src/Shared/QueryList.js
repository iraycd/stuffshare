let QueryList = {
    Dictionary: {
        GET_DICTIONARY: "getDictionariesQuery"
    },
    Category: {
        GET_CATEGORIES: "getCategoryQuery",
        GET_CATEGORIES_HIERARCHY: "getCategoryTreeQuery"
    },
    User: {
        LOG_IN_INTERNAL: "userLogInInternalQuery",
        LOG_IN_BY_REFRESH_TOKEN: "logInByRefreshTokenQuery",
        GET_REFRESH_TOKEN: "getRefreshTokenQuery",
        USER_INFO: "getUserInfoQuery",
        LOGIN_BY_EXTERNAL:"logInByExternalQuery"

    },
    Blob: {
        GET_BLOBS_BY_GUIDS: "getBlobsBase64ByGuidsQuery",
        GET_USER_IMAGES: "getUserImagesQuery",
        GET_UNVERIFIED:"getUnverifiedBlobsQuery"

    },
    Item: {
        GET_ITEM: "getItemQuery",
        SEARCH_ITEM: "searchItemQuery"
    },
    Country:{
        GET_COUNTRY:"getCountriesQuery"
    },
    City:{
        GET_CITY:'getCitiesQuery'
    },
    
}

export default QueryList;