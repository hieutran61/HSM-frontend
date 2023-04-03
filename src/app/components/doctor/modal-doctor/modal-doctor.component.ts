import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Doctor } from 'src/app/models/doctor.model';
import { ErrorMessage } from 'src/app/models/errorMessage.model';
import { DoctorService } from 'src/app/services/doctor.service';
import * as XLSX from 'xlsx';

@Component({
   selector: 'app-modal-doctor',
   templateUrl: './modal-doctor.component.html',
   styleUrls: ['./modal-doctor.component.css']
})
export class ModalDoctorComponent implements OnInit {

   @Output() reloadEvent = new EventEmitter<any>();

   excelData: Doctor[] = [];
   page: number = 1;
   pages: number[] = [];
   head: number = 1;
   tail: number = 11;
   numOfPages: number = 1;
   numberInPages: number = 14;
   recordPerPage: number = 8;
   totalRecord: number = 0;
   errorList: ErrorMessage[] = [];

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
         /* validate excel fields */
         this.validateExcelField();
         console.log('Error List: ' + this.errorList.at(0)?.error)
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

   validateExcelField() {
      let index = 1;

      /* Loop for each row of excel (1 element of excelData) */
      this.excelData.forEach(row => {

         let myRegExp = new RegExp("");

         /* Check if name is null, max length, pattern matching */
         if (row.name == null || row.name == '') {
            var err = this.errorList.find(error => error.no == index)
            if (err) {
               err.error += "Name is required, ";
            }
            else {
               this.errorList.push({ no: index, error: 'Name is required, ' });
            }
         }
         else {
            if (row.name.length > 500) {
               var err = this.errorList.find(error => error.no == index)
               if (err) {
                  err.error += "Name is too long (<500 character), ";
               }
               else {
                  this.errorList.push({ no: index, error: 'Name is too long (<500 character), ' });
               }
            }
            myRegExp = RegExp("^[a-zA-Z ]*$", "img");
            if (!myRegExp.test(row.name)) {
               var err = this.errorList.find(error => error.no == index)
               if (err) {
                  err.error += "Name can only take alphabet and space, ";
               }
               else {
                  this.errorList.push({ no: index, error: 'Name can only take alphabet and space, ' });
               };
            };
         };

         /* Check if username is null, max length, pattern matching, is exist */
         if (row.username == null || row.username == '') {
            var err = this.errorList.find(error => error.no == index)
            if (err) {
               err.error += "Username is required, ";
            }
            else {
               this.errorList.push({ no: index, error: 'Username is required, ' });
            }
         }
         else {
            // check Min and Max length
            if (row.username.length > 500 || row.username.length < 2) {
               var err = this.errorList.find(error => error.no == index)
               if (err) {
                  err.error += "Username must be at least 2 character and maximum 500 character, ";
               }
               else {
                  this.errorList.push({ no: index, error: 'Username must be at least 2 character and maximum 500 character, ' });
               }
            }
            //Check pattern matching
            myRegExp = new RegExp(/^(?=[a-zA-Z0-9._]{0,250}$)(?!.*[_.]{2})[^_.].*[^_.]$/, "img");
            if (!myRegExp.test(row.username)) {
               var err = this.errorList.find(error => error.no == index)
               if (err) {
                  err.error += "Username can only take alphabet, numberic and at least 2 character, ";
               }
               else {
                  this.errorList.push({ no: index, error: 'Username can only take alphabet, numberic and at least 2 character, ' });
               };
            };
            //   check username exist?
            this.doctorService.getUserByUsername(row.username).subscribe({
               next: (res) => {
                  if (res != null) { //res khac null --> Ton tai username trong database
                     let err = this.errorList.find(error => error.no == index)
                     if (err) {
                        err.error += "Username is exist, ";
                     }
                     else {
                        this.errorList.push({ no: index, error: 'Username is exist, ' });
                     };
                  }
               },
               error: (res) => {
                  console.log(res)
               }
            })
         };

         /* Check if password is null, min length, max length */
         if (row.password == null || row.password == '') {
            var err = this.errorList.find(error => error.no == index)
            if (err) {
               err.error += "Password is required, ";
            }
            else {
               this.errorList.push({ no: index, error: 'Password is required, ' });
            }
         }
         else {
            if (row.password.length > 250 || row.password.length < 3) {
               var err = this.errorList.find(error => error.no == index)
               if (err) {
                  err.error += "Password must be at least 3 character and maximum 250 character, ";
               }
               else {
                  this.errorList.push({ no: index, error: 'Username must be at least 3 character and maximum 250 character, ' });
               };
            };
         };

         /* Check if phone is max length and pattern matching */
         if (row.phone != null && row.phone != '' && row.phone.length > 250) {
            var err = this.errorList.find(error => error.no == index)
            if (err) {
               err.error += "Phone must be maximum 100 character, ";
            }
            else {
               this.errorList.push({ no: index, error: 'Phone must be maximum 100 character, ' });
            };
         };
         myRegExp = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, "img");
         if (row.phone != null && row.phone != '' && !myRegExp.test(row.phone)) {
            var err = this.errorList.find(error => error.no == index)
            if (err) {
               err.error += "Invalid phone number, ";
            }
            else {
               this.errorList.push({ no: index, error: 'Invalid phone number, ' });
            };
         };

         /* Check if email pattern matching */
         myRegExp = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, "img");
         if (row.email != null && row.email != '' && !myRegExp.test(row.email)) {
            var err = this.errorList.find(error => error.no == index)
            if (err) {
               err.error += "Invalid email, ";
            }
            else {
               this.errorList.push({ no: index, error: 'Invalid Email, ' });
            };
         };

         index++;
      })


   }





}
