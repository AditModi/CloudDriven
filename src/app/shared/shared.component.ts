import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Observable } from 'rxjs';
import { Shared } from '../shared';
import { Router } from '@angular/router';
import { FileUploadService } from '../file-upload.service';
import { FileUpload } from '../file-upload';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css']
})
export class SharedComponent implements OnInit {

  folders: Array<Shared> = []
  user:Array<String>=[];
  users:string=""
  newFolders: Array<FileUpload> = []
  list: Array<FileUpload> = []
  shared: Array<Shared> = []
  selected:Shared;
  selectFlag=false;
  new = false;
  show=false;
  constructor(private SharedServ: SharedService, private router: Router, private uploadServ: FileUploadService) { }
  uname: string;
  ngOnInit() {
    this.uname = localStorage.getItem('user')
    if (this.uname == null) {
      this.router.navigateByUrl('login')
    }
    this.SharedServ.getFolders().subscribe(data => {
      this.folders = data['data']
    }
    )
    this.uploadServ.getFiles().subscribe((data) => {
      this.newFolders = data
    })




    //console.log(this.folders)
  }

  showShared() {
    this.show=true
    for (let i = 0; i < this.folders.length; i++) {
      for (let j = 0; j < this.folders[i].users.length; j++) {
        if (this.folders[i].users[j] == this.uname) {
          this.shared.push(this.folders[i])
          //console.log(this.folders[i].folder)
        }
      }

    }
  }

  

  newShare() {
    for (let i = 0; i < this.newFolders.length; i++) {
      if ((this.newFolders[i].name.endsWith('/')) && this.newFolders[i].name != this.uname + '/') {
        console.log(i)
        this.list.push(this.newFolders[i])
      }
    }
    var l = []
    for (let i = 0; i < this.list.length; i++) {
      for (var j = 0; j < this.folders.length; j++) {
        if (this.folders[j].folder.name == this.list[i].name) {
          break;
        }
      }
      if (j == this.folders.length) {
        l.push(this.list[i])
      }
    }
    this.list = l;
    this.new = true
  }

  select(folder:FileUpload) {
    this.selected = new Shared(folder,[])
    
    this.selectFlag=true
    this.new=false;
  }

  share(){
    this.selectFlag=false;
    this.selected.users=this.users.split(',')
    this.SharedServ.addFolder(this.selected).subscribe(data=>{
      this.folders.push(data['data'])
    })
  }

  addUser(folder,i){
    folder.users.push(this.user[i])
    this.SharedServ.update(folder).subscribe(data=>console.log(data))
  }

  removeUser(f:Shared,user){
    f.users.splice(f.users.indexOf(user),1)
    this.SharedServ.update(f).subscribe(data=>console.log(data))
    //console.log(f)
  }

  remove(f:Shared){
    this.folders.splice(this.folders.indexOf(f),1)
    this.SharedServ.delete(f).subscribe(data=>console.log(data))
  }

}
