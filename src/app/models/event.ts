import { Player } from './player';
export class Event{
    constructor(public id:number = 0, public venue: number = 0,public eventCode: string = "", public date = Date(), public completed: boolean = false,public dateCompleted:Date, public players: Player[] = []){

    }
}
