export class UserData {
    fieldId: string;
    fieldName: string;
    passwordDecrypted: string;
    constructor(fieldId,fieldName,passwordDecrypted){
        this.fieldId=fieldId;
        this.fieldName=fieldName;
        this.passwordDecrypted=passwordDecrypted;
    }
}