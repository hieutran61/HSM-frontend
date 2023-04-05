import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor.model';

@Injectable({
    providedIn: 'root'
})
export class DoctorService {

    baseApiUrl: string = environment.baseApiUrl;

    constructor(private http: HttpClient, private router: Router) { }

    getAllDoctors() {
        return this.http.get<any[]>(this.baseApiUrl + "list-doctor");
    }

    getDoctorByUsername(username: string) {
        return this.http.get<Doctor>(this.baseApiUrl + "get-doctor-username/" + username);
    }

    getDoctorsPage(pageSize: Number, pageNum: Number, searchText: string, orderColumn: string, sort: string) {
        return this.http.get<any>(this.baseApiUrl + "list-doctor/page?pageSize=" + pageSize + "&pageNum=" + pageNum +
            "&searchText=" + searchText + "&orderColumn=" + orderColumn + "&sort=" + sort)

    }

    addDoctor(doctor: Doctor) {
        return this.http.post<any>(this.baseApiUrl + "admin/add-doctor", doctor);
    }

    deleteDoctor(docId: number) {
        return this.http.get<Doctor>(this.baseApiUrl + "list-doctor/delete/" + docId);
    }

    getDoctorById(docId: number) {
        return this.http.get<Doctor>(this.baseApiUrl + "list-doctor/" + docId);
    }

    getUserByUsername(username: String) {
        return this.http.get<Doctor>(this.baseApiUrl + "list-doctor/?username=" + username);
    }

    updateDoctor(updateDoctor: Doctor) {
        return this.http.post<any>(this.baseApiUrl + "list-doctor/update", updateDoctor);
    }

    importFromExcel(excelData: Doctor[]) {
        for (let doc of excelData) {
            doc.modifyTime = new Date().toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
            });
            doc.isActive = true;
        }
        return this.http.post<any>(this.baseApiUrl + "admin/add-doctor-excel", excelData);
    }

    getListBySearch(searchText: string){
        return this.http.get<Doctor[]>(this.baseApiUrl + "list-doctor-by-search/?searchText=" + searchText);
    }

}
