import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { WfhService } from './wfh.service';
import { WfhRequest } from './wfhrequest';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public title: string = 'Work from Home';
  public defaultFromTime: string = '08:00';
  public defaultToTime: string = '17:15';
  public currentDate: string = 'yyyy-MM-dd';

  constructor(private wfhService: WfhService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getCurrentDate();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
      alert(error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  private getCurrentDate(): void {
    this.wfhService.getCurrentDate().pipe(
      catchError(this.handleError)
    ).subscribe((response: string) => {
      this.currentDate = response;
    });
  }

  public onClickSubmit(wfhRequestForm: NgForm): void {
    console.log(wfhRequestForm.value);
    this.wfhService.submitRequest(wfhRequestForm.value).pipe(
      catchError(this.handleError)
    ).subscribe((response: WfhRequest) => {
      this._snackBar.open("Request submitted!", "Close", {
        duration: 3000
      });
    });
  }
}
