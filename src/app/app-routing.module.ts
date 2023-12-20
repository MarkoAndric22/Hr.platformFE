import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatesListComponent } from './candidates-list/candidates-list.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { candidateResolverResolver } from './core/resolvers/candidate.resolver.resolver';
import { SkillComponent } from './skill/skill.component';
import { skillResolverResolver } from './core/resolvers/skill.resolver.resolver';
import { SkillListComponent } from './skill-list/skill-list.component';
import { AddSkillComponent } from './addSkills/add-skill/add-skill.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  { path: 'candidate/:id', component: CandidatesComponent, resolve: { resolver: candidateResolverResolver }, },
  { path: 'candidate', component: CandidatesComponent },
  { path: 'candidates', component: CandidatesListComponent },
  { path: 'skill/:id', component: SkillComponent, resolve: { resolver: skillResolverResolver }, },
  { path: 'skill', component: SkillComponent },
  { path: 'skills', component: SkillListComponent },
  { path: 'addSkill/:id', component: AddSkillComponent, resolve: { resolver: candidateResolverResolver }, },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
