import { Commands } from 'src/command/command.enum';
import { Directions } from 'src/direction/direction.enum';
import { Grid } from 'src/grid/grid';
import { Obstacle } from 'src/obstacle/obstacle';
import { Point } from 'src/point/point';

export class Rover {
  private direction: Directions = Directions.NORTH;
  private point: Point = new Point(0, 0);
  private grid: Grid = new Grid(100, 100);
  private obstacles: Obstacle[] = [];

  lastObstacle: Obstacle;

  constructor(
    direction?: Directions,
    point?: Point,
    grid?: Grid,
    obstacles?: Obstacle[],
  ) {
    if (direction) this.direction = direction;
    if (point) this.point = point;
    if (grid) this.grid = grid;
    if (obstacles) this.obstacles = obstacles;
  }

  receive(commands: Commands[]) {
    const result: boolean = commands.every((c) => {
      if (!this.canMove(c)) {
        return false;
      }
      return true;
    });
    this.resetPoint();
    return result;
  }

  canMove(c: Commands) {
    let newY = this.point.getY();
    let newX = this.point.getX();
    if (c === Commands.FORWARD) {
      if (this.direction === Directions.NORTH) newY++;
      if (this.direction === Directions.EAST) newX++;
      if (this.direction === Directions.SOUTH) newY--;
      if (this.direction === Directions.WEST) newX--;
    }
    if (c === Commands.BACKWARD) {
      if (this.direction === Directions.NORTH) newY--;
      if (this.direction === Directions.EAST) newX--;
      if (this.direction === Directions.SOUTH) newY++;
      if (this.direction === Directions.WEST) newX++;
    }
    if (c === Commands.LEFT) {
      if (this.direction === Directions.NORTH) newX--;
      if (this.direction === Directions.EAST) newY++;
      if (this.direction === Directions.SOUTH) newX++;
      if (this.direction === Directions.WEST) newY--;
    }
    if (c === Commands.RIGHT) {
      if (this.direction === Directions.NORTH) newX++;
      if (this.direction === Directions.EAST) newY--;
      if (this.direction === Directions.SOUTH) newX--;
      if (this.direction === Directions.WEST) newY++;
    }
    if (!this.isObstacle(new Point(newX, newY))) {
      this.point.setX(newX);
      this.point.setY(newY);
      return true;
    }
    this.lastObstacle = new Obstacle(newX, newY);
    return false;
  }

  resetPoint() {
    this.point.setX((this.point.getX() + this.grid.getX()) % this.grid.getX());
    this.point.setY((this.point.getY() + this.grid.getY()) % this.grid.getY());
  }

  isObstacle(point: Point): boolean {
    const found = this.obstacles.find(
      (o) => o.getX() === point.getX() && o.getY() === point.getY(),
    );
    if (found) return true;
    else return false;
  }

  getPosition(): Point {
    return this.point;
  }

  getDirection(): Directions {
    return this.direction;
  }

  getGrid(): Grid {
    return this.grid;
  }

  getObstacles(): Obstacle[] {
    return this.obstacles;
  }
}
