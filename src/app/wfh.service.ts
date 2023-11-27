import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { WfhRequest } from './wfhrequest';

@Injectable({
  providedIn: 'root'
})
export class WfhService {

  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getCurrentDate(): Observable<string> {
    return this.http.get<string>(`${this.apiServerUrl}/current_date`);
  }

  public submitRequest(wfhRequest: NgForm): Observable<WfhRequest> {
    console.log(wfhRequest);
    return this.http.post<WfhRequest>(`${this.apiServerUrl}/submit`, wfhRequest);
  }
}
