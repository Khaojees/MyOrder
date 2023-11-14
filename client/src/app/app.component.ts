import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {FormComponent} from './form/form.component'
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { CoreService } from './core/core.service';

// export interface UserData {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   dateOfBirth:string;
//   gender: string;
// }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    FormComponent,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    displayedColumns: string[] = ['_id', 'firstName', 'lastName', 'dateOfBirth', 'gender', 'action'];
    dataSource!: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _httpClient: HttpClient,
    private _coreService: CoreService
    ){
  }

  ngOnInit(): void {
    this.getAllUser();
  }

  openAddEditForm(){
    const dialogRef = this._dialog.open(FormComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllUser();
        }
      },
    });
  }

  getAllUser(){
    this._httpClient.get("http://localhost:3000/getdata").subscribe({
      next: (res:any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
        setTimeout(() => this.dataSource.paginator = this.paginator);
      },
      error: console.log,
    });
  }

  deleteUser(id:string){
    this._httpClient.delete(`http://localhost:3000/deletedata/${id}`).subscribe({
      next:()=>{
        this._coreService.openSnackBar('User deleted!', 'done');
        this.getAllUser()
      },
      error: console.log,
    })
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(FormComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllUser();
        }
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
