import { Achievement } from "./achievement";
export class Game_Achievement{
  constructor(public completed: boolean = false, public player_id: number = 0, public achievement: Achievement){}
}
