import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Achievement } from './models/achievement';
import { Player } from './models/player';
import { ServiceResponse } from './models/service-response.model';
enum URL{
    LOCAL = "http://localhost:3000",
    REMOTE = "http://147.182.191.84:3000"
}
let url = URL.LOCAL

@Injectable({
  providedIn: 'root'
})
export class AchievementServiceService {

  readonly options =  {
    headers: new HttpHeaders({
      'Content-Type':'application/json;charset=utf-8 '
    })
  }

  constructor(private http:HttpClient) { }

  //Player
  loginPlayer(player:Player):Observable<Player>{
    return this.http.post<Player>(`${url}/player/login`,player,this.options).pipe(catchError(this.handleError));
  }

  createPlayer(player: Player):Observable<Player>{
    return this.http.post<Player>(`${url}/player/create`, player, this.options).pipe(catchError(this.handleError));
  }

  //Achievement
  getAllAchievements():Observable<Achievement[]>{
    return this.http.get<Achievement[]>(`${url}/achievement`).pipe(catchError(this.handleError))
  }

  createAchievement(achievement: Achievement):Observable<Achievement>{
    console.log(achievement.data)
    return this.http.post<Achievement>(`${url}/achievement/create`,achievement,this.options).pipe(catchError(this.handleError))
  }

  deleteAchievement(id: number): Observable<ServiceResponse>{
    console.log(`id to be deleted ${id}`);
    return this.http.delete<ServiceResponse>(`${url}/achievement/delete/${id}`,this.options).pipe(catchError(this.handleError));
  }

  //Error Handling
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
