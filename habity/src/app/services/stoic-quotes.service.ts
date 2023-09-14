import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoicQuotesService {



  constructor(private http: HttpClient) { }

  getRandomQuote(): Observable<any> {
    const headers = { 'X-Api-Key': 'aQvmCPuWMV8sPWcs7BoQ3Q==XDxlJC41rcqL7v6E' };
    return this.http.get('https://api.api-ninjas.com/v1/quotes?category=inspirational', { headers })
  }
}
