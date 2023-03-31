import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';
import * as XLSX from 'xlsx';

@Component({
   selector: 'app-modal-doctor',
   templateUrl: './modal-doctor.component.html',
   styleUrls: ['./modal-doctor.component.css']
})
export class ModalDoctorComponent implements OnInit {

   @Output() reloadEvent = new EventEmitter<any>();

   excelData: any[] = [];
   page: number = 1;
   pages: number[] = [];
   head: number = 1;
   tail: number = 11;
   numOfPages: number = 1;
   numberInPages: number = 14;
   recordPerPage: number = 10;
   totalRecord: number = 0;

   constructor(private router: Router, private toast: NgToastService, private route: ActivatedRoute,
      private doctorService: DoctorService) { }

   ngOnInit(): void {

   }

   formatDatetime(datetime: string) {
      return {
         date: new Date(datetime).toLocaleDateString("en-GB"),
         time: new Date(datetime).toLocaleTimeString("en-GB")
      }
   }

   readExcel(event: any) {

      if (event.target.files.length !== 1) throw new Error('Cannot use multiple files');

      let file = event.target.files[0];

      let fileReader = new FileReader();
      fileReader.readAsBinaryString(file);

      fileReader.onload = (e: any) => {
         var binaryString = e.target.result;
         var workBook = XLSX.read(binaryString, { type: 'binary' });
         var sheetName = workBook.SheetNames[0];
         var workSheet = workBook.Sheets[sheetName];
         this.excelData = XLSX.utils.sheet_to_json(workSheet);
         console.log(this.excelData);

         /*Get total record and count num of pages */
         this.totalRecord = this.excelData.length;
         this.countPages();
      }

      document.getElementById("openModalButton")?.click();
      this.ngOnInit();
   }

   uploadExcel() {
      this.doctorService.importFromExcel(this.excelData).subscribe({
         next: (res) => {
            this.toast.success({ detail: "Success", summary: "Add new doctor successfully", duration: 5000 });
            console.log(res);

            this.reloadEvent.emit();
         },
         error: (res) => {
            this.toast.error({ detail: "Error", summary: "Something wrong", duration: 5000 });
            console.log(res);
         }
      })
   }

   countPages() {
      this.numOfPages = Math.ceil(this.totalRecord / this.recordPerPage);
      if (this.page <= 0 || this.page > this.numOfPages) {
         this.page = 1;
      }

      /*Get head and tail value */
      if (this.head > this.numOfPages) this.head = 1;
      if (this.numOfPages >= 11) {


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
      console.log("Page: " + this.page);
      console.log("Head: " + this.head);
      console.log("Tail: " + this.tail);
      var value = this.head;
      this.pages = [];
      for (let i = 0; i <= (this.tail - this.head); i++) {
         this.pages[i] = value++;
      }

   }

   changePage(i: number) {
      this.page = i;
      this.countPages();

   }



}
