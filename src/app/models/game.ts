import { Game_Achievement } from './game_achievement';
import { Player } from './player';
export class Game {
  constructor(
    public id: number = 0,
    public timeEnded: Date = new Date(),
    public eventCode: string = '',
    public datePlayed: Date = new Date(),
    public gameCode: string = '',
    public first: number = 0,
    public second: number = 0,
    public third: number = 0,
    public fourth: number = 0,
    public playerCount: number = 0,
    public lookingForPlayers: boolean = false,
    public players: Player[]
  ) {}
}
