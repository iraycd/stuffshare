
let CommandList = {
    Dictionary: {
        ADD_DICTIONARY: "addToDictionaryCommand",
        REMOVE_DICTIONARY: "removeDictionaryCommand"
    },
    Category: {
        ADD_CATEGORY: "insertCategoryCommand",
        SET_AS_VERIFIED: "setAsVerifiedCommand",
        DELETE_CATEGORY:"deleteCategoryCommand",
        SET_PARENT:"setParentCategoryCommand",
        EDIT_CATEGORY:"editCategoryCommand"

    },
    User: {
        CREATE_USER: "createUserCommand",
        AUTHORIZE_USER: "authorizeUserCommand",
        GEN_REFRESH_TOKEN: "genRefreshTokenCommand",
        LOG_OUT: "logOutCommand",
        CHANGE_PASSWORD: "changePasswordCommand",
        FORGOT_PASSWORD: "forgotPasswordCommand",
        REMOVE_USER: "removeUserCommand",
        FORGOT_PASSWORD_CHECK: "sendMailForgotPasswordCommand",
        SET_LANGUAGE: "setLanguageCommand",
        SET_COORDIATES: "setCoordinatesCommand",
        SET_PROFILE_IMAGE: "setProfileImageCommand",
        CREATE_USER_EXTERNAL_PROV:"createUserByExternalCommand"
    },
    Blob: {
        UPLOAD_IMAGE: "uploadImageCommand",
        REMOVE_BLOB: "removeBlobCommand",
        VERIFY_IMAGE: "verifyImageCommand"
    },
    Item: {
        NEW_ITEM: "createItemCommand",
        EDIT_ITEM: "editItemCommand"
    }
}
export default CommandList;