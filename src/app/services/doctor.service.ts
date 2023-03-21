import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  baseApiUrl:string = environment.baseApiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  getAllDoctors(){
    return this.http.get<any[]>(this.baseApiUrl +"list-doctor");
  }

  getDoctorByUsername(username: string){
    return this.http.get<Doctor>(this.baseApiUrl + "get-doctor-username/" + username);
  }

  getDoctorsPage(pageSize: Number, pageNum: Number, searchText: string, orderColumn: string, isIncrease: boolean){
    return this.http.get<any>(this.baseApiUrl + "list-doctor/page?pageSize=" + pageSize + "&pageNum=" + pageNum +
                                                "&searchText=" + searchText + "&orderColumn=" + orderColumn + "&isIncrease=" + isIncrease)

  }

  addDoctor(doctor: Doctor)
  {
    return this.http.post<any>(this.baseApiUrl + "admin/add-doctor", doctor);
  }

}
