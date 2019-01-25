
let CommandList = {
    Dictionary: {
        ADD_DICTIONARY: "addToDictionaryCommand",
        REMOVE_DICTIONARY: "removeDictionaryCommand"
    },
    Category: {
        ADD_CATEGORY: "insertCategoryCommand",
        SET_AS_VERIFIED:"setAsVerifiedCommand"
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
        SET_LANGUAGE:"setLanguageCommand",
        SET_COORDIATES:"setCoordinatesCommand"

    },
    Blob: {
        UPLOAD_IMAGE: "uploadImageCommand",
        REMOVE_BLOB: "removeBlobCommand"
    },
    Item:{
        NEW_ITEM:"createItemCommand",
        EDIT_ITEM:"editItemCommand"
    }
}
export default CommandList;