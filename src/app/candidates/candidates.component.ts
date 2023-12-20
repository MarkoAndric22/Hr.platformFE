import { Component, OnInit } from '@angular/core';
import { Candidate } from '../core/models/candidate.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CandidateServiceService } from '../core/services/candidate.service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Skill } from '../core/models/skill.model';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css'],
  providers: [DatePipe],
})
export class CandidatesComponent implements OnInit {
  id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  candidateForm?: FormGroup;
  candidate: Candidate;
  skill?: Skill;
  filterCandidate?: Candidate[]

  constructor(
    private fb: FormBuilder,
    private candidateService: CandidateServiceService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private datePipe: DatePipe
  ) {
    this.candidate = this.activatedRoute.snapshot.data['resolver'];
  }

  ngOnInit(): void {
    this.buildForm(this.candidate);
  }

  buildForm(candidate?: Candidate) {
    this.candidateForm = this.fb.group({
      id: [candidate?.id],
      name: [
        candidate?.name,
        [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
      ],
      date_of_birth: [
        candidate?.date_of_birth ? this.datePipe.transform(candidate.date_of_birth, 'yyyy-MM-dd') : null,
        [Validators.required],
      ],
      contact_number: [
        candidate?.contact_number,
        [Validators.required, Validators.minLength(10)],
      ],
      email: [
        candidate?.email,
        [Validators.required, Validators.email],
      ],
    },
      { validators: [this.digitValidator] });
  }

  digitValidator = (formGroup: FormGroup) => {
    const contact_number = formGroup.get('contact_number')?.value;
    const regex = /^\d+$/;


    if (!regex.test(contact_number)) {
      formGroup.get('contact_number')?.setErrors({ nondigit: true });
    }

  };

  hasErrors(componentName: string, errorCode?: string) {
    const control = this.candidateForm?.get(componentName);
    return (
      (control?.dirty || control?.touched || this.candidateForm?.valid) &&
      ((!errorCode && control?.errors) ||
        (errorCode && control?.hasError(errorCode)))
    );
  }

  onSave() {
    const candidateData = this.candidateForm?.getRawValue();
    candidateData.date_of_birth = this.datePipe.transform(candidateData.date_of_birth, 'yyyy-MM-dd');
    if (this.id) {
      this.candidateService.editCandidate(this.id, candidateData).subscribe(() => {
        this.route.navigate(['../candidates']);
      });
    } else {
      this.candidateService.saveCandidate(candidateData).subscribe(() => {
        this.route.navigate(['../candidates']);
      });
    }
  }

}
