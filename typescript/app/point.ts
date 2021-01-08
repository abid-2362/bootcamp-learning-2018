interface PointType {
  x:number,
  y:number
}

class Point {
  constructor(private _x = 0, private _y = 0) {
  }

  draw() {
    // we can access the properties: x and y here inside the function so no need to pass the point here.
    console.log(`x: ${this._x}, y: ${this._y}`)
  }

  getDistance(anotherPoint: PointType) {
    // ...
  }

  get x() {
    return this._x;
  }
  set x(value: number) {
    if(value < 0)
      throw new Error('value cannot be less than 0');
    this._x = value;
  }
}

export default Point;