import { FileUpload } from './file-upload';

export class Shared{
    _id:string
    folder:FileUpload
    users:Array<String>

    constructor(folder,users){
        this.folder=folder
        this.users=users
    }
}