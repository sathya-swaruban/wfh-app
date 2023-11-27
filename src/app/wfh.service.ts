import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WfhRequest } from './wfhrequest';

@Injectable({
  providedIn: 'root'
})
export class WfhService {

  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public submitRequest(wfhRequest: WfhRequest): Observable<WfhRequest> {
    return this.http.post<WfhRequest>(`${this.apiServerUrl}/submit`, wfhRequest);
  }

}
