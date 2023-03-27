import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgToastModule } from 'ng-angular-popup';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AddDoctorComponent } from './components/doctor/add-doctor/add-doctor.component';
import { ListDoctorComponent } from './components/doctor/list-doctor/list-doctor.component';
import { UpdateDoctorComponent } from './components/doctor/update-doctor/update-doctor.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    AddDoctorComponent,
    ListDoctorComponent,
    UpdateDoctorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgToastModule,
    NgMultiSelectDropDownModule.forRoot()


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
