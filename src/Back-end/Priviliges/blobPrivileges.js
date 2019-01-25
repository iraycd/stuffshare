

async function checkIfUserHaveAccessToRemoveBlob() {
    let blob = await this.blobServiceDI.getById({ id: this.model.id })
    if (blob == null) {
        return false;
    }
    if (blob.user_id == this.context.user.id) {
        return true;
    } else {
        return false
    }
}

let BlobPrivileges = {
    checkIfUserHaveAccessToRemoveBlob
}
export default BlobPrivileges