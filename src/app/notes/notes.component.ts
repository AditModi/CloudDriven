import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from '../note';
import { escapeIdentifier } from '@angular/compiler/src/output/abstract_emitter';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes:Array<Note>=[]
  edit:Array<boolean>=[]
  uname;
  constructor(private router:Router,private noteServ:NotesService) { }

  ngOnInit() {
    this.uname=localStorage.getItem('user')
    if(this.uname==null){
      this.router.navigateByUrl('login')
    }
    //this.noteServ.getNotesByUser(this.uname);
    this.noteServ.getNotes().subscribe((data)=>{
      this.notes=data['data']
    })

    this.notes.forEach(()=>{
      this.edit.push(false)
    }
    )
  }
  link(event,note:Note){
    event.preventDefault()
    let i = this.notes.indexOf(note)
    this.edit[i]=true;  
  }

  save(note:Note){
    let i = this.notes.indexOf(note)
    this.noteServ.updateNote(note).subscribe(d=>{
      this.edit[i]=false;
    })
    

  }

  delete(note:Note){
    let i = this.notes.indexOf(note)
    this.noteServ.deleteNote(note).subscribe(()=>{
      this.notes.splice(i,1)
      this.edit.splice(i,1)
    })
    
  }

  add(event){
    event.preventDefault()
    //this.notes.push(new Note("untitled","new",this.uname))
    this.noteServ.addNote(new Note("untitled","new",this.uname)).subscribe(data=>{
      this.notes.push(data['data'])
    })
    
  }

}
