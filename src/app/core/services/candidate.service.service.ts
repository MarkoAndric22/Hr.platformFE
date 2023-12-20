import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Candidate } from '../models/candidate.model';
import { Skill } from '../models/skill.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateServiceService {

  constructor(private httpClient: HttpClient) {

  }

  deleteCandidate(candidate: Candidate) {
    return this.httpClient.delete<String>(`http://localhost:8080/hrplatform/candidate/${candidate.id}`, { responseType: 'text' as 'json' });
  }

  editCandidate(id: number, candidate: Candidate): Observable<any> {
    return this.httpClient.put<any>(`http://localhost:8080/hrplatform/candidate/${candidate.id}`, candidate);
  }

  saveCandidate(candidate: Candidate): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:8080/hrplatform/candidate`, candidate);
  }

  addSkillToCandidate(candidateId: number, skills: Skill[]): Observable<any> {
    console.log(skills)
    return this.httpClient.post<any>(`http://localhost:8080/hrplatform/candidate/ADDskill/${candidateId}`, skills);
  }

  removeSkillFromCandidate(candidateId: number, skillId: number): Observable<any> {
    const params = {
      id_candidate: candidateId.toString(),
      id_skill: skillId.toString()
    };

    return this.httpClient.delete<any>('http://localhost:8080/hrplatform/candidate/REMOVEskill', { params });
  }

  getCandidateByName(name: string): Observable<Candidate[]> {
    const params = {
      name: name
    };
    return this.httpClient.get<Candidate[]>('http://localhost:8080/hrplatform/candidate/name', { params });
  }

  getCandidateBySkill(skill: string): Observable<Candidate[]> {
    const params = {
      skill: skill
    };
    return this.httpClient.get<Candidate[]>(`http://localhost:8080/hrplatform/candidate/skill`, { params });
  }

  getCandidateById(id: number) {
    return this.httpClient.get<Candidate>(`http://localhost:8080/hrplatform/candidate/${id}`);
  }

  getAll(): Observable<Candidate[]> {
    return this.httpClient.get<Candidate[]>(`http://localhost:8080/hrplatform/candidate`);
  }

  getSkillforCandidate(id: number): Observable<Skill[]> {
    return this.httpClient.get<Skill[]>(`http://localhost:8080/hrplatform/candidate/getSkillforCandidate/${id}`);

  }

  getSkillforCandidateDontHave(id: number): Observable<Skill[]> {
    return this.httpClient.get<Skill[]>(`http://localhost:8080/hrplatform/candidate/getSkillforCandidateDontHave/${id}`);
  }
}
