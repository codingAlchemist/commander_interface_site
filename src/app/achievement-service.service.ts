import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Achievement } from './models/achievement';

enum URL{
    LOCAL = "http://localhost:3000",
    REMOTE = "http://db-tengence.cvc6slu8aqwy.us-east-1.rds.amazonaws.com"
}

@Injectable({
  providedIn: 'root'
})
export class AchievementServiceService {

  readonly options =  {
    headers: new HttpHeaders({
      'Content-Type':'appication/json'
    })
  }

  constructor(private http:HttpClient) { }

  getAllAchievements():Observable<Achievement[]>{
    return this.http.get<Achievement[]>(`${URL.REMOTE}/achievement`).pipe(catchError(this.handleError))
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
