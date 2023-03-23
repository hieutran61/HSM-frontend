import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDoctorComponent } from './components/doctor/add-doctor/add-doctor.component';
import { ListDoctorComponent } from './components/doctor/list-doctor/list-doctor.component';
import { HomepageComponent } from './components/homepage/homepage.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'admin/add-doctor',
    component: AddDoctorComponent
  },
  {
    path: 'admin/list-doctor',
    component: ListDoctorComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
