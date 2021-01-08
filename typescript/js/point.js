"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Point = /** @class */ (function () {
    function Point(_x, _y) {
        if (_x === void 0) { _x = 0; }
        if (_y === void 0) { _y = 0; }
        this._x = _x;
        this._y = _y;
    }
    Point.prototype.draw = function () {
        // we can access the properties: x and y here inside the function so no need to pass the point here.
        console.log("x: " + this._x + ", y: " + this._y);
    };
    Point.prototype.getDistance = function (anotherPoint) {
        // ...
    };
    Object.defineProperty(Point.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            if (value < 0)
                throw new Error('value cannot be less than 0');
            this._x = value;
        },
        enumerable: true,
        configurable: true
    });
    return Point;
}());
exports.default = Point;
//# sourceMappingURL=point.js.map