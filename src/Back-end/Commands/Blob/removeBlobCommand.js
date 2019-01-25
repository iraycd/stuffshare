"use strict";
import BaseCommand from "./../../Architecture/baseCommand.js";
import LogFileInfrastructure from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import UserService from "../../Services/userService.js";
import AuthInfrastucture from "../../Architecture/Infrastructure/authInfrastucture.js";
import BlobService from "../../Services/blobService.js";
import ValidatonInfrastructure from "../../Architecture/Infrastructure/validatonInfrastructure.js";
import DbTransactionInfrastucture from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import BlobDTO from "../../../Shared/DTO/Blob/BlobDTO.js";
import PrivilegesInfrastructure from "../../Architecture/Infrastructure/privilegesInfrastructure.js";
import BlobPrivileges from "../../Priviliges/blobPrivileges.js";


/**
 *
 *
 * @export
 * @class RemoveBlobCommand
 * @extends {BaseCommand}
 */
export default class RemoveBlobCommand extends BaseCommand {
    /**
     * Creates an instance of CreateUserCommand.
     * @param  {{logFileInfrastructureDI:LogFileInfrastructure ,dbTransactionInfrastuctureDI:DbTransactionInfrastucture,userServiceDI: UserService ,authInfrastructureDI:AuthInfrastucture,blobServiceDI:BlobService,validationInfrastructureDI:ValidatonInfrastructure,privilegesInfrastructureDI:PrivilegesInfrastructure }}
     * @memberof RemoveBlobCommand
     */
    constructor({
        logFileInfrastructureDI,
        authInfrastructureDI,
        blobServiceDI,
        privilegesInfrastructureDI
    }) {
        super({
            logFileInfrastructureDI,
            authInfrastructureDI,
            privilegesInfrastructureDI
        });
        this.blobServiceDI = blobServiceDI;
    }
    init(dto) {
        this.model = Object.assign(new BlobDTO(), dto);
    }

    get validation() {
        return [];
    }

    get privileges() {
        return [
            BlobPrivileges.checkIfUserHaveAccessToRemoveBlob
        ]
    }

    async action() {
        await this.blobServiceDI.delete({model:this.model});
    }
}
