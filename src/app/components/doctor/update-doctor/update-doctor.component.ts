import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
   selector: 'app-update-doctor',
   templateUrl: './update-doctor.component.html',
   styleUrls: ['./update-doctor.component.css']
})
export class UpdateDoctorComponent implements OnInit {
   doctor: Doctor = {
      docId: 0,
      name: "",
      username: "",
      password: "",
      department: "",
      specialization: "",
      phone: "",
      address: "",
      email: "",
      modifyTime: "",
      isActive: true
   }

   isUsernameExist: boolean = false;

   oldUsername: string = "";

   constructor(private route: ActivatedRoute, private router: Router, private toast: NgToastService, private doctorService: DoctorService) { }

   ngOnInit(): void {

      this.route.paramMap.subscribe({
         next: (res) => {
            const id = Number(res.get('id'));
            if (id) {
               this.doctorService.getDoctorById(id).subscribe({
                  next: (res) => {
                     if (res != null)
                     {
                        this.doctor = res;
                        this.oldUsername = this.doctor.username;
                     }
                     else
                     {
                        this.toast.error({ detail: "Error", summary: "Something wrong" });
                        this.router.navigate(['admin/list-doctor']);
                     }
                  }
               })
            }
         },
         error: (res) => {
            console.log(res);
         }
      })
   }

   /*****-------------------- ADD DOCTOR FORM ---------------------*/
   addDoctorForm = new FormGroup({
      name: new FormControl("", [
         Validators.required,
         Validators.minLength(1),
         Validators.maxLength(500),
         Validators.pattern("^[a-zA-Z ]*$")
      ]),
      username: new FormControl("", [
         Validators.required,
         Validators.minLength(0),
         Validators.maxLength(250),
         Validators.pattern("^(?=[a-zA-Z0-9._]{0,250}$)(?!.*[_.]{2})[^_.].*[^_.]$")
      ]),
      password: new FormControl("", [
         Validators.required,
         Validators.minLength(3),
         Validators.maxLength(250)
      ]),
      specialization: new FormControl("", [
         Validators.maxLength(500)
      ]),
      department: new FormControl("", [
         Validators.maxLength(20)
      ]),
      phone: new FormControl("", [
         Validators.maxLength(100),
         Validators.pattern("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")
      ]),
      address: new FormControl("", [
         Validators.maxLength(500)
      ]),
      email: new FormControl("", [
         // Validators.maxLength(500),
         // Validators.email
         Validators.pattern("[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+")
      ])
   });

   get Name(): FormControl {
      return this.addDoctorForm.get('name') as FormControl;
   }

   get Username(): FormControl {
      return this.addDoctorForm.get('username') as FormControl;
   }

   get Password(): FormControl {
      return this.addDoctorForm.get('password') as FormControl;
   }

   get Specialization(): FormControl {
      return this.addDoctorForm.get('specialization') as FormControl;
   }

   get Department(): FormControl {
      return this.addDoctorForm.get('department') as FormControl;
   }

   get Phone(): FormControl {
      return this.addDoctorForm.get('phone') as FormControl;
   }

   get Address(): FormControl {
      return this.addDoctorForm.get('address') as FormControl;
   }

   get Email(): FormControl {
      return this.addDoctorForm.get('email') as FormControl;
   }


   /*********************------------------- --------------- ---------------------***********************/

   updateDoctor() {
      this.doctor.modifyTime = new Date().toLocaleString('en-US', {
         month: 'short',
         day: 'numeric',
         year: 'numeric',
         hour: 'numeric',
         minute: 'numeric',
         second: 'numeric',
         hour12: true
       });
      this.doctorService.updateDoctor(this.doctor).subscribe({
         next: (res) => {
            this.toast.success({ detail: "Success", summary: "Update success" });
            this.router.navigate(['admin/list-doctor']);

         },
         error: (res) => {
            this.toast.error({ detail: "Error", summary: "Something wrong" });
            console.log(res);
         }
      })

   }

   checkUsername() {
      if ((this.doctor.username != "") && (this.doctor.username != this.oldUsername)) {
         this.doctorService.getUserByUsername(this.doctor.username).subscribe({
            next: (res) => {
               console.log(res != null)
               this.isUsernameExist = (res != null)
            },
            error: (res) => {
               console.log(res)
            }
         })
      }
      else this.isUsernameExist = false;
   }

   private validateAllFormFields(form: FormGroup) {
      Object.keys(form.controls).forEach(field => {
         const control = form.get(field);
         if (control instanceof FormControl) {
            control.markAsDirty({ onlySelf: true });
         }
         else if (control instanceof FormGroup) {
            this.validateAllFormFields(control)
         }
      })
   }


}
