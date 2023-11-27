import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { WfhService } from './wfh.service';
import { WfhRequest } from './wfhrequest';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  public title: string = 'Work from Home';

  fromDate = new FormControl(moment.utc());
  toDate = new FormControl(moment.utc());
  fromTime = new FormControl('08:00');
  toTime = new FormControl('17:15');

  constructor(private wfhService: WfhService, private _snackBar: MatSnackBar) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
      alert(error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  public onClickSubmit(): void {
    let wfhRequest = new WfhRequest(
      this.fromDate.value?.toISOString().substring(0, 10),
      this.toDate.value?.toISOString().substring(0, 10),
      this.fromTime.value,
      this.toTime.value,
    );

    this.wfhService.submitRequest(wfhRequest).pipe(
      catchError(this.handleError)
    ).subscribe(() => {
      this._snackBar.open("Request submitted!", "Close", {
        duration: 3000
      });
    });
  }
}
