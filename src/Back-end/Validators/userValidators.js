import ValidationException from './../Architecture/Exceptions/validationExceptions.js'



async function checkIfMailExistInDb() {
    let validationResult = await this.userServiceDI.checkMailInDb({
        email: this.model.email
    });
    if (validationResult != null) {
        let exception = new ValidationException();
        exception.throw({ field: "email", code: "EMAIL_EXIST_IN_DB" }, [
            this.model.email
        ]);
    }
}

let UserValidators = {
    checkIfMailExistInDb
}
export default UserValidators
