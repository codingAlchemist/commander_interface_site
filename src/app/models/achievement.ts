export class Achievement {
  constructor(
    public id: number,
    public name:string,
    public desc:string,
    public points:number
  ){ }

  data = {
    'name' : this.name,
    'desc' : this.desc,
    'points' : this.points
  }
}
