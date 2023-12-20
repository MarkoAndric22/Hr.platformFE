import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SkillComponent } from './skill/skill.component';
import { SkillListComponent } from './skill-list/skill-list.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { CandidatesListComponent } from './candidates-list/candidates-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddSkillComponent } from './addSkills/add-skill/add-skill.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    SkillComponent,
    SkillListComponent,
    CandidatesComponent,
    CandidatesListComponent,
    AddSkillComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
