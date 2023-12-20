import { Component, OnInit } from '@angular/core';
import { CandidateServiceService } from '../../core/services/candidate.service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Candidate } from '../../core/models/candidate.model';
import { Skill } from '../../core/models/skill.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.css']
})
export class AddSkillComponent implements OnInit {

  candidate?: Candidate;
  candidates?: Candidate[];
  skill?: Skill;
  candidateSkillForm?: FormGroup;
  candidateId?: number;
  skills: Skill[] = [];
  candidateSkills: Skill[] = [];

  constructor(
    private fb: FormBuilder,
    private candidateService: CandidateServiceService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private activeRoute: ActivatedRoute,
  ) {
    this.candidate = this.activatedRoute.snapshot.data['resolver'];
    this.buildForm(this.candidate);
  }

  ngOnInit(): void {
    this.candidateId = Number(this.activeRoute.snapshot.paramMap.get('id'));
    this.candidateService.getSkillforCandidate(this.candidateId).subscribe(s => this.candidateSkills = s);
    this.candidateService.getSkillforCandidateDontHave(this.candidateId).subscribe(s => this.skills = s);
    this.buildForm();
  }

  buildForm(candidate?: Candidate) {

    this.candidateSkillForm = this.fb.group({
      selectedSkills: [[]]
    })

    if (candidate) {
      this.candidateSkillForm.get('selectedSkills')?.disable();
    }

  }


  addSkillToCandidateDontHave(Id: number) {
    this.candidateService.getSkillforCandidateDontHave(Id).subscribe(() => {
      this.candidates;
    });
  }

  onRemoveSkillToCandidate(skillId: number) {
    this.candidateService.removeSkillFromCandidate(this.candidateId!, skillId).subscribe(() => {
      this.route.navigate(['../candidates']);
    });
  }

  onSave() {
    const selectedSkills = this.candidateSkillForm?.get('selectedSkills')?.value;
    this.candidateService.addSkillToCandidate(this.candidateId!, selectedSkills).subscribe(() => {
      this.route.navigate(['../candidates']);
    });
  }

}

