export class Note{
    _id:string
    title:string
    text:string
    owner:string
    constructor(name:string,text:string,user:string){
        this.title=name
        this.text=text
        this.owner=user

    }
}