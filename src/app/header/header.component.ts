import { Component, OnInit } from '@angular/core';
import { CandidateServiceService } from '../core/services/candidate.service.service';
import { Candidate } from '../core/models/candidate.model';
import { Skill } from '../core/models/skill.model';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  candidates?: Candidate[];
  searchTerm: string = '';


  constructor(private candidateService: CandidateServiceService) {

  }
  ngOnInit(): void {
    this.getAllCandidates();
  }

  getAllCandidates() {
    this.candidateService.getAll().subscribe(candidates => this.candidates = candidates)
  }

  search() {
    console.log(this.searchTerm)
    // console.log(this.candidate)
    // if (this.candidate && this.candidate.name) {
    //   console.log(this.candidate, this.candidate.name)
    if (this.searchTerm === '') {
      this.getAllCandidates();
    }
    this.candidateService.getCandidateByName(this.searchTerm)
      .subscribe((candidates) => {
        this.candidates = candidates;
      });
    // } else if (this.skill && this.skill.name) {
    //   console.log(this.skill, this.skill.name)
    //   this.candidateService.getCandidateBySkill(this.skill.name)
    //     .subscribe((candidates) => {
    //       this.filterCandidate = candidates;
    //     });
    // } else {
    // }
  }


}
