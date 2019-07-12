import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearcherComponent } from './searcher/searcher.component';


const routes: Routes = [
  {path: 'search', component: SearcherComponent},
  {path: '', redirectTo: '/search', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
