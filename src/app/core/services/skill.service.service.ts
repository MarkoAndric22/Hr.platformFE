import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Skill } from '../models/skill.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillServiceService {

  constructor(private httpClient:HttpClient) { 

  }
  
  saveCandidate(candidate: Skill): Observable<any>{
    return this.httpClient.post<any>(`http://localhost:8080/hrplatform/skill`,Skill);
  }

  getSkillById(id:number){
    return this.httpClient.get<Skill>(`http://localhost:8080/hrplatform/skill/${id}`);
  }
}
