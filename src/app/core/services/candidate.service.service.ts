import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Candidate } from '../models/candidate.model';
import { Skill } from '../models/skill.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateServiceService {

  constructor(private httpClient:HttpClient) { 

  }
  
  deleteCandidate(candidate: Candidate){
    return this.httpClient.delete<String>(`http://localhost:8080/hrplatform/candidate/${candidate.id}`, {responseType: 'text' as 'json'});
  }

  saveCandidate(candidate: Candidate): Observable<any>{
    return this.httpClient.post<any>(`http://localhost:8080/hrplatform/candidate`,candidate);
  }

  getCandidateByName(name:string){
    return this.httpClient.get<Candidate>(`http://localhost:8080/hrplatform/candidate/${name}`);
  }

  getCandidateBySkill(name:string){
    return this.httpClient.get<Candidate>(`http://localhost:8080/hrplatform/candidate/${Skill.name}`);
  }

  getCandidateById(id:number){
    return this.httpClient.get<Candidate>(`http://localhost:8080/hrplatform/candidate/${id}`);
  }

  getAll():Observable<Candidate[]>{
    return this.httpClient.get<Candidate[]>(`http://localhost:8080/hrplatform/candidate`);
  }
}
