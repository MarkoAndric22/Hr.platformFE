import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Skill } from '../models/skill.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillServiceService {

  constructor(private httpClient: HttpClient) {

  }

  saveSkill(candidate: Skill): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:8080/hrplatform/skill`, Skill);
  }

  getSkillById(id: number) {
    return this.httpClient.get<Skill>(`http://localhost:8080/hrplatform/skill/${id}`);
  }

  getAll(): Observable<Skill[]> {
    return this.httpClient.get<Skill[]>(`http://localhost:8080/hrplatform/skill`);
  }

  editSkill(id: number, skill: Skill): Observable<any> {
    return this.httpClient.put<any>(`http://localhost:8080/hrplatform/skill/${skill.id}`, skill);
  }

  deleteSkill(skill: Skill) {
    return this.httpClient.delete<String>(`http://localhost:8080/hrplatform/skill/${skill.id}`, { responseType: 'text' as 'json' });
  }

}
