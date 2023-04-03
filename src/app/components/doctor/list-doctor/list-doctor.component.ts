import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';
import * as XLSX from 'xlsx';
import * as jQuery from 'jquery';
import * as bootstrap from "bootstrap";

declare var $: any;
@Component({
    selector: 'app-list-doctor',
    templateUrl: './list-doctor.component.html',
    styleUrls: ['./list-doctor.component.css']
})
export class ListDoctorComponent implements OnInit {

    searchText: string = "";

    filterDoctors: any[] = [];

    page: number = 1;

    pages: number[] = [];

    numberInPages: number = 14;

    head: number = 1;

    tail: number = 11;

    numOfPages: number = 1;

    recordPerPage: number = 6;

    totalRecord: number = 0;

    columnSort = {
        colName: "modifyTime",
        isIncrease: false
    }




    constructor(private router: Router, private toast: NgToastService, private route: ActivatedRoute,
        private doctorService: DoctorService) { }

    ngOnInit(): void {

        this.doctorService.getDoctorsPage(this.recordPerPage, this.page, this.searchText, this.columnSort.colName, this.columnSort.isIncrease ? "asc" : "desc").subscribe({
            next: (res) => {
                console.log(res)
                this.filterDoctors = res.filterDoctor;
                this.totalRecord = res.totalRecord;
                this.countPages();

                /*Get head and tail value */
                if (this.head > this.numOfPages) this.head = 1;
                if (this.numOfPages >= 11) {
                    console.log("Page: " + this.page);
                    console.log("Head: " + this.head);
                    console.log("Tail: " + this.tail);

                    if ((this.page == this.head) || (this.page == this.head + 1) || (this.page == this.head + 2)) {
                        for (let i = 0; i < 3; i++) {
                            if ((this.head - 1) <= 0)
                                break;
                            else this.head--;
                        }
                    }

                    if ((this.page == this.tail) || (this.page == this.tail - 1) || (this.page == this.tail - 2)) {
                        for (let i = 0; i < 3; i++) {
                            if ((this.head + 15) > this.numOfPages)
                                break;
                            else this.head++;
                        }
                    }

                    this.tail = this.head + this.numberInPages;

                } else {
                    this.tail = this.numOfPages;
                }
                /* */
                var value = this.head;
                this.pages = [];
                for (let i = 0; i <= (this.tail - this.head); i++) {
                    this.pages[i] = value++;
                }

            },
            error: (response) => {
                console.log(response);
            }
        })
    }

    deleteDoctor(docId: number) {
        this.doctorService.deleteDoctor(docId).subscribe({
            next: (res) => {
                this.toast.success({ detail: "Success", summary: "Delete doctor successfully", duration: 2000 });
                this.ngOnInit();
            },
            error: (res) => {
                this.toast.error({ detail: "Error", summary: "Something wrong", duration: 2000 });
                console.log(res);
            }
        });

    }

    checkChange() {
        this.ngOnInit();
    }

    countPages() {
        this.numOfPages = Math.ceil(this.totalRecord / this.recordPerPage);
        if (this.page <= 0 || this.page > this.numOfPages) {
            this.page = 1;
        }
    }

    changePage(i: number) {
        // this.router.navigateByUrl(('admin/list-doctor?page=' + i));
        this.page = i;
        this.countPages();
        this.ngOnInit();
    }

    changeRecordPerPage() {
        this.ngOnInit();
    }

    formatDatetime(datetime: string) {
        return {
            date: new Date(datetime).toLocaleDateString("en-GB"),
            time: new Date(datetime).toLocaleTimeString("en-GB")
        }
    }

    sort(colName: string) {
        if (this.columnSort.colName == colName) {
            this.columnSort.isIncrease = !this.columnSort.isIncrease;
        }
        else {
            this.columnSort.colName = colName;
            this.columnSort.isIncrease = true;
        }

        console.log(this.columnSort);
        this.ngOnInit();
    }

    exportToExcel() {
        this.doctorService.getListBySearch(this.searchText).subscribe({
            next: (res) => {
                let element = res;
                element.forEach(e => {
                    delete e.password;
                    delete e.isActive;
                });

                const workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(element);
                const workBook: XLSX.WorkBook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet1");
                XLSX.writeFile(workBook, "DoctorList.xlsx");
            },
            error: (res) => {
                this.toast.error({ detail: "Error", summary: "Something wrong", duration: 5000 });
                console.log(res);
            }
        })

    }


}
