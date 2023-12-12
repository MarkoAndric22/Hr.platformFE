import { Component, OnInit } from '@angular/core';
import { Candidate } from '../core/models/candidate.model';
import { CandidateServiceService } from '../core/services/candidate.service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.css']
})
export class CandidatesListComponent implements OnInit {

  candidates?:Candidate[];

  constructor(private candidateService:CandidateServiceService, private router:Router){

  }
  ngOnInit(): void {
    this.getAll();
  }
  
    getAll(){
      this.candidateService.getAll()
      .subscribe(c =>{this.candidates=c;})
    }

    onDelete(candidate:Candidate){
      if(candidate){
        this.candidateService.deleteCandidate(candidate).subscribe(() =>{
          this.getAll();
        });
      }
    }
  
}
