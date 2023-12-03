import { Component, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { WfhService } from './wfh.service';
import { WfhRequest } from './wfhrequest';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  message: string;
}

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

  constructor(private wfhService: WfhService, private _snackBar: MatSnackBar, private dialog: MatDialog) { }

  openDialog(error: HttpErrorResponse): any {
    this.dialog.open(ExceptionDialog, {
      data: {
        message: error.error,
      },
    });
  }

  public onClickSubmit(): void {
    let wfhRequest = new WfhRequest(
      this.fromDate.value?.toISOString().substring(0, 10),
      this.toDate.value?.toISOString().substring(0, 10),
      this.fromTime.value,
      this.toTime.value,
    );

    this.wfhService.submitRequest(wfhRequest).pipe(
      catchError(err => this.openDialog(err))
    ).subscribe(() => {
      this._snackBar.open("Request submitted!", "Close", {
        duration: 3000
      });
    });
  }
}

@Component({
  selector: 'exception-dialog',
  templateUrl: './exception-dialog.html',
  styleUrl: './exception-dialog.css'
})
export class ExceptionDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }
}
