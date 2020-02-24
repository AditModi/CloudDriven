export class FileUpload {
    name: string;
    url: string;
    size:number;
    constructor(name: string, url: string,size:number) {
        this.name = name;
        this.url = url;
        this.size=size;
    }
}