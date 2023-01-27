export class Point {
  private x: number;
  private y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getY(): number {
    return this.y;
  }

  getX(): number {
    return this.x;
  }

  setY(y: number) {
    this.y = y;
  }

  setX(x: number) {
    this.x = x;
  }

  incrementY() {
    this.y++;
  }

  decrementY() {
    this.y--;
  }

  incrementX() {
    this.x++;
  }

  decrementX() {
    this.x--;
  }
}
