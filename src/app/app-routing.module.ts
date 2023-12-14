import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatesListComponent } from './candidates-list/candidates-list.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { candidateResolverResolver } from './core/resolvers/candidate.resolver.resolver';
import { SkillComponent } from './skill/skill.component';
import { skillResolverResolver } from './core/resolvers/skill.resolver.resolver';
import { SkillListComponent } from './skill-list/skill-list.component';

const routes: Routes = [
  { path: 'candidate/:id', component: CandidatesComponent, resolve: { resolver: candidateResolverResolver }, },
  { path: 'candidate', component: CandidatesComponent },
  { path: 'candidates', component: CandidatesListComponent },
  { path: 'skill/:id', component: SkillComponent, resolve: { resolver: skillResolverResolver }, },
  { path: 'skill', component: SkillComponent },
  { path: 'skills', component: SkillListComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
