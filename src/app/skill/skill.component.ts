import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { SkillServiceService } from '../core/services/skill.service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from '../core/models/skill.model';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  skillForm?: FormGroup;
  skill: Skill;

  constructor(
    private fb: FormBuilder,
    private candidateService: SkillServiceService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private skillService: SkillServiceService,
  ) {
    this.skill = this.activatedRoute.snapshot.data['resolver'];
  }

  ngOnInit(): void {
    console.log(this.skill)
    this.buildForm(this.skill);
  }

  buildForm(skill?: Skill) {
    this.skillForm = this.fb.group({
      id: [skill?.id],
      name: [skill?.name, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    }), { validators: [this.uniqueNameValidator] }
  }

  uniqueNameValidator(): (control: AbstractControl) => ValidationErrors | null {
    const uniqueNames: string[] = []; // Čuvanje unikatnih imena lokalno na klijentskoj strani

    return (control: AbstractControl): ValidationErrors | null => {
      const name = control.value;

      if (!name) {
        return null; // Ne validiraj prazno polje
      }

      // Provera jedinstvenosti lokalno
      if (uniqueNames.includes(name)) {
        return { notUnique: true };
      }

      // Ako je jedinstveno lokalno, dodaj u listu
      uniqueNames.push(name);
      console.log("nije uniqe");
      return null;
    };
  }

  hasErrors(componentName: string, errorCode?: string) {
    const control = this.skillForm?.get(componentName);
    return (
      (control?.dirty || control?.touched || this.skillForm?.valid) &&
      ((!errorCode && control?.errors) ||
        (errorCode && control?.hasError(errorCode)))
    );
  }

  onSave() {
    const skillData = this.skillForm?.getRawValue();;
    if (this.id) {
      this.skillService.editSkill(this.id, skillData).subscribe(() => {
        this.route.navigate(['../skills']);
      });
    } else {
      this.candidateService.saveSkill(skillData).subscribe(() => {
        this.route.navigate(['../skills']);
      });
    }
  }

}
