import { Component, OnInit } from '@angular/core';
import { Candidate } from '../core/models/candidate.model';
import { CandidateServiceService } from '../core/services/candidate.service.service';
import { Router } from '@angular/router';
import { Skill } from '../core/models/skill.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.css']
})
export class CandidatesListComponent implements OnInit {

  candidates?: Candidate[];
  skills?: Skill[];

  constructor(private candidateService: CandidateServiceService, private router: Router) {

  }
  ngOnInit(): void {
    this.candidateService.getAll()
      .subscribe(candidates => {
        const observables = candidates.map(candidate =>
          this.candidateService.getSkillforCandidate(candidate.id!)
        );

        forkJoin(observables).subscribe(skillsArray => {
          this.candidates = candidates.map((candidate, index) => {
            return { ...candidate, skills: skillsArray[index] };
          });
        });
      });
  }

  getAll() {
    this.candidateService.getAll()
      .subscribe(c => { this.candidates = c; })
  }

  onDelete(candidate: Candidate) {
    if (candidate) {
      this.candidateService.deleteCandidate(candidate)
        .subscribe(() => {
          this.getAll();
        });
    }
  }

}