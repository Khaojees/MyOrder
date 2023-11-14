import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule} from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CoreService } from '../core/core.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
    userForm: FormGroup;

    constructor(
      private _fb: FormBuilder,
      private _dialogRef: MatDialogRef<FormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private _coreService: CoreService,
      private _httpClient: HttpClient
      ){
      this.userForm = this._fb.group({
        firstName:'',
        lastName:'',
        dateOfBirth:'',
        gender:''
      })
    }

    ngOnInit(): void {
      this.userForm.patchValue(this.data);
    }
  
    onFormSubmit() {
      if (this.userForm.valid) {
        if (this.data) {    
          this._httpClient.put(`http://localhost:3000/editdata`,
            {
              "_id":this.data._id,
              "firstName":this.userForm.value.firstName,
              "lastName":this.userForm.value.lastName,
              "dateOfBirth":this.userForm.value.dateOfBirth,
              "gender":this.userForm.value.gender
          })
            .subscribe({
              next: (val: any) => {
                this._coreService.openSnackBar('User detail updated!');
                this._dialogRef.close(true);
              },
              error: (err: any) => {
                console.error(err);
              },
            });
        } else {
          this._httpClient.post(`http://localhost:3000/adddata`,this.userForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('User added successfully');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
        }
      }
    }

}
