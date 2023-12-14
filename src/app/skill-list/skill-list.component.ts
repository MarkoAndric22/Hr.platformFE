import { Component, OnInit } from '@angular/core';
import { Skill } from '../core/models/skill.model';
import { SkillServiceService } from '../core/services/skill.service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})
export class SkillListComponent implements OnInit {

  skills?: Skill[];
  name = ''
  constructor(private skillService: SkillServiceService, private router: Router) {

  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.skillService.getAll().subscribe(s => { this.skills = s })
  }

  onDelete(skill: Skill) {
    if (skill) {
      this.skillService.deleteSkill(skill).subscribe(() => {
        this.getAll();
      });
    }
  }

}
