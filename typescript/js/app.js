"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
var point_1 = __importDefault(require("./point"));
// let point = new Point(1, 2);
var point = new point_1.default(5, 8);
point.draw();
point.x = 10;
point.draw();
point.x = 3;
point.draw();
//# sourceMappingURL=app.js.map