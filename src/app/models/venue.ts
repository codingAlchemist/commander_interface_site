import { Event } from "./event";
export class Venue{
    constructor(public id:number = 0, public admin_id:number = 0, public name:string = "", public street:string = "", public city:string = "", public state:string = "", public zip:string = "", public logo:string = "", public venue_number:string = "", public events: Event[] = []){

    }
}