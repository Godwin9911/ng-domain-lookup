import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  private url = 'api/checkdomain';

  checkDomain(domain: string): Promise<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return new Promise((resolve, reject) => {
      this.http.post(`${this.url}`, {domain}, { headers })
      .toPromise()
      .then(
        res => resolve(res),
        msg => reject(msg)
      );
    });
  }
}
