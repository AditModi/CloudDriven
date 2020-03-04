import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shared } from './shared';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http:HttpClient) { }

  getFolders():Observable<Shared[]>{
    return this.http.get<Shared[]>(environment.apiBaseUrl+'/folders')
  }

  addFolder(folder):Observable<Shared>{
    return this.http.post<Shared>(environment.apiBaseUrl+"/folders",folder)
  }

  update(folder):Observable<Shared>{
    return this.http.put<Shared>(environment.apiBaseUrl+"/folder/",folder)
  }
}
