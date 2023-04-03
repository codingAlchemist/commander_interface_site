import { Venue } from "./venue";

export class Venue_Admin{
    constructor(public id:number = 0, public username:string = "",public firstname:string = "", public lastname:string = "", public pass: string = "",public email: string = "", public approved: boolean = false,public venues: Venue[] = []){
        
    }

}