export class Achievement {
  constructor(
    public id: number = 0,
    public name:string = "",
    public desc:string = "",
    public points:number = 0
  ){ }

  data = {
    'name' : this.name,
    'desc' : this.desc,
    'points' : this.points
  }
}
