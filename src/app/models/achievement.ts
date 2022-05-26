export class Achievement {
  constructor(
    public achievement:string,
    public description:string,
    public points:number
  ){ }

  data = {
    'achievement' : this.achievement,
    'description' : this.description,
    'points' : this.points
  }
}
