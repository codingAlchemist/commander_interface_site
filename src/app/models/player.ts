export class Player {
    constructor(public id:number = 0,public username:string,public password: string, public nickname:string,public desc:string, public level:number, public points: number, public email:string,public isEventApproved: Boolean = false,public game_code: string = "",public event_code: string = ""){

    }
}
