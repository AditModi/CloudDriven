import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Note } from './note';

@Injectable(//{
  //providedIn: 'root'
//}
)
export class NotesService {

  constructor(private http:HttpClient) { }

  getNotes():Observable<Note[]>{
    console.log("Get notes")
    return this.http.get<Note[]>(environment.apiBaseUrl+'/notes')

  }

  // getNotesByUser(uname:string):Note[]{
  //   console.log("Get notes by user")
  //   let list:Note[];
  //   this.http.get<Note[]>(environment.apiBaseUrl+'/notes').subscribe(data=>data['data'])
  //   list.forEach((element,i) => {
  //     if(element.owner!=uname){
  //       list.splice(i,1)
  //     }
  //   });
  //   console.log(list)
  //   return list
  // }

  addNote(note):Observable<Note>{
    return this.http.post<Note>(environment.apiBaseUrl+"/notes",note)
  }
  
  updateNote(note:Note):Observable<Note>{
    return this.http.put<Note>(environment.apiBaseUrl+"/note/"+note._id,note)
  }

  deleteNote(note:Note){
    return this.http.delete<Note>(environment.apiBaseUrl+"/note/"+note._id)
  }
}
