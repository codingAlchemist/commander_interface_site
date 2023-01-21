import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Achievement } from '.././models/achievement';
import { Player } from '.././models/player';
import { Owner } from '.././models/owner';

import { ServiceResponse } from '.././models/service-response.model';
import { Email } from '.././models/email';

enum URL{
    LOCAL = "http://localhost:3000",
    REMOTE = "http://137.184.49.209:3000"
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
  loginPlayer(player:Player):Observable<Player> {
    return this.http.post<Player>(`${url}/player/login`,player,this.options).pipe(catchError(this.handleError));
  }

  createPlayer(player: Player):Observable<Player> {
    return this.http.post<Player>(`${url}/player/create`, player, this.options).pipe(catchError(this.handleError));
  }

  //Achievement
  getAllAchievements():Observable<Achievement[]> {
    return this.http.get<Achievement[]>(`${url}/achievements`).pipe(catchError(this.handleError))
  }

  createAchievement(achievement: Achievement):Observable<Achievement> {
    console.log(achievement.data)
    return this.http.post<Achievement>(`${url}/achievements/create`,achievement,this.options).pipe(catchError(this.handleError))
  }

  deleteAchievement(id: number): Observable<ServiceResponse> {
    console.log(`id to be deleted ${id}`);
    return this.http.delete<ServiceResponse>(`${url}/achievements/delete/${id}`,this.options).pipe(catchError(this.handleError));
  }

  //Store
  createStoreOwner(owner: Owner): Observable<Owner> {
    return this.http.post<Owner>(`${url}/store/owner/create`,owner,this.options).pipe(catchError(this.handleError));
  }
  
  getAllOwners(): Observable<Owner[]> {
    return this.http.get<Owner[]>(`${url}/store/owners`).pipe(catchError(this.handleError))
  }

  approveOwner(owner: Owner) : Observable<Owner> {
    return this.http.put<Owner>(`${url}/store/owner/${owner.id}/update`, owner, this.options).pipe(catchError(this.handleError));
  }

  emailUser(email: Email): Observable<Email> {
    return this.http.post<Email>(`${url}/email`, email, this.options).pipe(catchError(this.handleError));
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
