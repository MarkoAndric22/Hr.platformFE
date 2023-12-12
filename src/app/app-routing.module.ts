import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatesListComponent } from './candidates-list/candidates-list.component';

const routes: Routes = [
  // {path:'allergens',component: AllergenListComponent},
  {path:'candidates',component: CandidatesListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
