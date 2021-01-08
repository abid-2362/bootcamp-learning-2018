/*
  // enum Color { Red, Orange, Green, Blue };
  // let backgroundColor = Color.Orange;

  interface Point {
    x: number,
    y: number
  }
  let drawPoint = (point: Point) => {
    // ...
  }
  let getDistance = (pointA: Point, pointB: Point) => {
    // ...
  }
  drawPoint({
    x: 1,
    y: 2,
  });
*/
import Point from "./point";
// let point = new Point(1, 2);
let point = new Point(5, 8);
point.draw();
point.x = 10;
point.draw();
point.x = 3;
point.draw();