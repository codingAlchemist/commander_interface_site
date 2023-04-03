import { Game_Achievement } from "./game_achievement";
export class Game{
    constructor(
      public event_id: number = 0,
       public timeEnded: Date = new Date(),
       public timeStarted: Date = new Date(),
       public datePlayed: Date = new Date(),
       public gameCode: string = "",
       public first: number = 0,
       public second: number = 0,
       public third: number = 0,
       public fourth: number = 0,
       public lookingForPlayers: boolean = false,
        public achievements: Game_Achievement[] = [] ) {

    }
}
