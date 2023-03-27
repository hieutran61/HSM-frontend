import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
    selector: 'app-list-doctor',
    templateUrl: './list-doctor.component.html',
    styleUrls: ['./list-doctor.component.css']
})
export class ListDoctorComponent implements OnInit {
    private sortBy: string = "";

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

        this.doctorService.getDoctorsPage(this.recordPerPage, this.page, this.searchText, this.columnSort.colName, this.columnSort.isIncrease? "asc":"desc").subscribe({
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

    searchData(name: string | null, username: string | null, department: string | null, specialization: string | null, phone: string | null, address: string | null, email: string | null) {
        this.searchText = this.searchText.trim().toLowerCase();
        return name?.toLowerCase().includes(this.searchText) || username?.toLowerCase().includes(this.searchText) || department?.toLowerCase().includes(this.searchText) ||
            specialization?.toLowerCase().includes(this.searchText) || phone?.toLowerCase().includes(this.searchText) || address?.toLowerCase().includes(this.searchText) || email?.toLowerCase().includes(this.searchText);
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

}
