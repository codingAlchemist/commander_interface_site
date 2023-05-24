import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Achievement } from '.././models/achievement';
import { Player } from '.././models/player';
import { Venue_Admin } from '../models/venue_admin';
import { Game } from '../models/game';
import { Event } from '../models/event';
import { Venue } from '../models/venue';
import { PlayerAchievement } from '../models/player_achievement';
import { ServiceResponse } from '.././models/service-response.model';
import { Email } from '.././models/email';
import { CookieService } from 'ngx-cookie-service';
import { EventData } from '../models/event-data';
import { LoginData } from '../models/login-data';
import { environment } from 'src/environments/environment';
enum URL {
  LOCAL = 'http://ocalhost:3000/api',
  REMOTE = 'http://137.184.49.209:3000',
}
let url = environment.production ? URL.REMOTE : URL.LOCAL;
@Injectable({
  providedIn: 'root',
})
export class AchievementService {
  readonly options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8 ',
    }),
  };

  constructor(private http: HttpClient) {}

  //Achievement
  getAllAchievements(): Observable<Achievement[]> {
    return this.http
      .get<Achievement[]>(`${url}/achievements`, this.options)
      .pipe(catchError(this.handleError));
  }

  createAchievement(achievement: Achievement): Observable<Achievement> {
    console.log(achievement.data);
    return this.http
      .post<Achievement>(
        `${url}/achievements/create`,
        achievement,
        this.options
      )
      .pipe(catchError(this.handleError));
  }

  deleteAchievement(id: number): Observable<ServiceResponse> {
    console.log(`id to be deleted ${id}`);
    return this.http
      .delete<ServiceResponse>(`${url}/achievements/delete/${id}`, this.options)
      .pipe(catchError(this.handleError));
  }

  //Event
  createEvent(eventData: EventData): Observable<Event> {
    return this.http
      .post<Event>(`${url}/events/create`, eventData, this.options)
      .pipe(catchError(this.handleError));
  }

  getEventPlayers(event_id: number): Observable<Event> {
    return this.http
      .get<Event>(`${url}/players/event/${event_id}`, this.options)
      .pipe(catchError(this.handleError));
  }

  getEvent(eventCode: string): Observable<Event> {
    return this.http
      .get<Event>(`${url}/events/${eventCode}`, this.options)
      .pipe(catchError(this.handleError));
  }
  endEvent(eventCode: string): Observable<ServiceResponse> {
    return this.http
      .put<ServiceResponse>(`${url}/events/${eventCode}/end`, this.options)
      .pipe(catchError(this.handleError));
  }
  approvePlayerForEvent(queryString: string): Observable<ServiceResponse> {
    return this.http
      .put<ServiceResponse>(
        `${url}/players/approve${queryString}`,
        this.options
      )
      .pipe(catchError(this.handleError));
  }
  getAllEventsByVenue(venue: Venue): Observable<Venue> {
    return this.http
      .get<Venue>(`${url}events/?id=${venue.id}`, this.options)
      .pipe(catchError(this.handleError));
  }
  addPlayerToEvent(
    player: Player,
    evenCode: string
  ): Observable<ServiceResponse> {
    return this.http
      .put<ServiceResponse>(
        `${url}/players/${player.id}/event/add`,
        evenCode,
        this.options
      )
      .pipe(catchError(this.handleError));
  }
  //Game
  getAllGames(event_id: number): Observable<Game[]> {
    return this.http
      .get<Game[]>(`${url}/games/${event_id}`, this.options)
      .pipe(catchError(this.handleError));
  }
  getAllGamesAndPlayers(evenCode: string): Observable<Game[]> {
    return this.http
      .get<Game[]>(`${url}/games/${evenCode}/players`, this.options)
      .pipe(catchError(this.handleError));
  }
  getAllAchievementsForPlayer(player: Player): Observable<PlayerAchievement[]> {
    return this.http
      .get<PlayerAchievement[]>(
        `${url}/players/${player.id}/achievements`,
        this.options
      )
      .pipe(catchError(this.handleError));
  }

  createGameWithAchievements(event_id: string): Observable<Game> {
    return this.http
      .post<Game>(`${url}/games/create`, event_id, this.options)
      .pipe(catchError(this.handleError));
  }

  getGameWithAchievements(gameCode: string): Observable<Game> {
    return this.http
      .get<Game>(`${url}/games/${gameCode}/game`, this.options)
      .pipe(catchError(this.handleError));
  }
  groupPlayersIntoGames(event_id: number): Observable<ServiceResponse> {
    return this.http
      .post<ServiceResponse>(
        `${url}/games/players/group`,
        { event_id: event_id },
        this.options
      )
      .pipe(catchError(this.handleError));
  }
  //Venue
  login(owner: Venue_Admin): Observable<Venue_Admin> {
    return this.http
      .post<Venue_Admin>(`${url}/venue/login`, owner, this.options)
      .pipe(catchError(this.handleError));
  }
  createAccount(owner: Venue_Admin): Observable<Venue_Admin> {
    return this.http
      .post<Venue_Admin>(`${url}/venue/admin/create`, owner, this.options)
      .pipe(catchError(this.handleError));
  }
  createVenue(venue: Venue): Observable<Venue> {
    return this.http
      .post<Venue>(`${url}/venue/create`, venue, this.options)
      .pipe(catchError(this.handleError));
  }
  getAllAdmins(): Observable<Venue_Admin[]> {
    return this.http
      .get<Venue_Admin[]>(`${url}/venue/admins`)
      .pipe(catchError(this.handleError));
  }
  getAdminById(admin_id: string): Observable<Venue_Admin> {
    return this.http
      .get<Venue_Admin>(`${url}/venue/admin/${admin_id}`)
      .pipe(catchError(this.handleError));
  }
  updateAdminAccount(admin: Venue_Admin): Observable<Venue_Admin> {
    return this.http
      .put<Venue_Admin>(
        `${url}/venue/admin/${admin.id}/update`,
        admin,
        this.options
      )
      .pipe(catchError(this.handleError));
  }
  getVenuesByAdminAccount(admin_id: string): Observable<Venue[]> {
    return this.http
      .get<Venue[]>(`${url}/venue/${admin_id}`, this.options)
      .pipe(catchError(this.handleError));
  }
  approveAdminAccount(owner: Venue_Admin): Observable<Venue_Admin> {
    return this.http
      .put<Venue_Admin>(
        `${url}/venue/owner/${owner.id}/update`,
        owner,
        this.options
      )
      .pipe(catchError(this.handleError));
  }
  emailUser(email: Email): Observable<Email> {
    return this.http
      .post<Email>(`${url}/email`, email, this.options)
      .pipe(catchError(this.handleError));
  }

  //Player
  loginPlayer(loginData: LoginData): Observable<Player> {
    return this.http
      .post<Player>(`${url}/players/login`, loginData, this.options)
      .pipe(catchError(this.handleError));
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
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
