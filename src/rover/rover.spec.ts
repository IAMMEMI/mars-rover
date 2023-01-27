import { Commands } from 'src/command/command.enum';
import { Directions } from 'src/direction/direction.enum';
import { Grid } from 'src/grid/grid';
import { Obstacle } from 'src/obstacle/obstacle';
import { Point } from 'src/point/point';
import { Rover } from './rover';

describe('Rover', () => {
  describe('You are given the initial starting point (x,y) of a rover and the direction (N,S,E,W) it is facing.', () => {
    it('should set start location', () => {
      const rover: Rover = new Rover(Directions.EAST, new Point(5, 1));
      expect(rover.getPosition()).toStrictEqual(new Point(5, 1));
    });
    it('should use default starting location value 0x0 when not assigned', function () {
      const rover: Rover = new Rover();
      expect(rover.getPosition()).toEqual(new Point(0, 0));
    });
    it('should set direction as numeric value', function () {
      const rover: Rover = new Rover(Directions.NORTH, new Point(12, 21));
      expect(rover.getDirection()).toEqual(Directions.NORTH);
    });
    it('should use default starting direction value N when not assigned', function () {
      const rover: Rover = new Rover(null, new Point(5, 7));
      expect(rover.getDirection()).toEqual(Directions.NORTH);
    });
  });

  describe('The rover receives a character array of commands.', () => {
    it('should receive array of commands', () => {
      const rover: Rover = new Rover(Directions.EAST, new Point(5, 1));
      expect(
        rover.receive([Commands.BACKWARD, Commands.LEFT, Commands.FORWARD]),
      ).toBe(true);
    });
  });

  describe('Implement commands that move the rover forward/backward (f,b).', () => {
    it('should move forward from north 0,0 to 0,1', () => {
      const rover: Rover = new Rover(Directions.NORTH, new Point(0, 0));
      rover.receive([Commands.FORWARD]);
      expect(rover.getPosition()).toStrictEqual(new Point(0, 1));
    });
    it('should move forward from east 0,0 to 1,0', () => {
      const rover: Rover = new Rover(Directions.EAST, new Point(0, 0));
      rover.receive([Commands.FORWARD]);
      expect(rover.getPosition()).toStrictEqual(new Point(1, 0));
    });
    it('should move forward from south 10,20 to 10, 19', () => {
      const rover: Rover = new Rover(Directions.SOUTH, new Point(10, 20));
      rover.receive([Commands.FORWARD]);
      expect(rover.getPosition()).toStrictEqual(new Point(10, 19));
    });
    it('should move forward from west 10, 13 to 9, 13', () => {
      const rover: Rover = new Rover(Directions.WEST, new Point(10, 13));
      rover.receive([Commands.FORWARD]);
      expect(rover.getPosition()).toStrictEqual(new Point(9, 13));
    });
    it('should move backward from north 0,1 to 0,0', () => {
      const rover: Rover = new Rover(Directions.NORTH, new Point(0, 1));
      rover.receive([Commands.BACKWARD]);
      expect(rover.getPosition()).toStrictEqual(new Point(0, 0));
    });
    it('should move backward from east 13,17 to 12,17', () => {
      const rover: Rover = new Rover(Directions.EAST, new Point(13, 17));
      rover.receive([Commands.BACKWARD]);
      expect(rover.getPosition()).toStrictEqual(new Point(12, 17));
    });
    it('should move backward from south 0,0 to 0,1', () => {
      const rover: Rover = new Rover(Directions.SOUTH, new Point(0, 0));
      rover.receive([Commands.BACKWARD]);
      expect(rover.getPosition()).toStrictEqual(new Point(0, 1));
    });
    it('should move backward from west 0,0 to 1,0', () => {
      const rover: Rover = new Rover(Directions.WEST, new Point(0, 0));
      rover.receive([Commands.BACKWARD]);
      expect(rover.getPosition()).toStrictEqual(new Point(1, 0));
    });
  });

  describe('Implement commands that turn the rover left/right (l,r).', () => {
    it('should move left from north 10,0 to 9,0', () => {
      const rover: Rover = new Rover(Directions.NORTH, new Point(10, 0));
      rover.receive([Commands.LEFT]);
      expect(rover.getPosition()).toStrictEqual(new Point(9, 0));
    });
    it('should move left from east 0,0 to 0,1', () => {
      const rover: Rover = new Rover(Directions.EAST, new Point(0, 0));
      rover.receive([Commands.LEFT]);
      expect(rover.getPosition()).toStrictEqual(new Point(0, 1));
    });
    it('should move left from south 0,0 to 1,0', () => {
      const rover: Rover = new Rover(Directions.SOUTH, new Point(0, 0));
      rover.receive([Commands.LEFT]);
      expect(rover.getPosition()).toStrictEqual(new Point(1, 0));
    });
    it('should move left from west 15, 11 to 15, 10', () => {
      const rover: Rover = new Rover(Directions.WEST, new Point(15, 11));
      rover.receive([Commands.LEFT]);
      expect(rover.getPosition()).toStrictEqual(new Point(15, 10));
    });

    it('should move right from north 0,0 to 1,0', () => {
      const rover: Rover = new Rover(Directions.NORTH, new Point(0, 0));
      rover.receive([Commands.RIGHT]);
      expect(rover.getPosition()).toStrictEqual(new Point(1, 0));
    });
    it('should move right from east 0,5 to 0, 4', () => {
      const rover: Rover = new Rover(Directions.EAST, new Point(0, 5));
      rover.receive([Commands.RIGHT]);
      expect(rover.getPosition()).toStrictEqual(new Point(0, 4));
    });
    it('should move right from south 3, 7 to 2,7', () => {
      const rover: Rover = new Rover(Directions.SOUTH, new Point(3, 7));
      rover.receive([Commands.RIGHT]);
      expect(rover.getPosition()).toStrictEqual(new Point(2, 7));
    });
    it('should move right from west 0,0 to 0,1', () => {
      const rover: Rover = new Rover(Directions.WEST, new Point(0, 0));
      rover.receive([Commands.RIGHT]);
      expect(rover.getPosition()).toStrictEqual(new Point(0, 1));
    });
  });

  describe('Implement wrapping from one edge of the grid to another. (planets are spheres after all)', () => {
    it('should assign grid size 5x5', () => {
      const rover: Rover = new Rover(
        Directions.NORTH,
        new Point(0, 0),
        new Grid(5, 5),
      );
      expect(rover.getGrid()).toStrictEqual(new Grid(5, 5));
    });

    it('should use default value 100x100 when grid is not assigned', () => {
      const rover: Rover = new Rover(Directions.NORTH, new Point(0, 0));
      expect(rover.getGrid()).toStrictEqual(new Grid(100, 100));
    });

    it('should return X to 0 when grid is 5x5 and position is 4x0', () => {
      const rover: Rover = new Rover(
        Directions.NORTH,
        new Point(4, 0),
        new Grid(5, 5),
      );
      rover.receive([Commands.RIGHT]);
      expect(rover.getPosition()).toStrictEqual(new Point(0, 0));
    });

    it('should return Y to 0 when grid is 5x5 and position is 0x4', () => {
      const rover: Rover = new Rover(
        Directions.NORTH,
        new Point(0, 4),
        new Grid(5, 5),
      );
      rover.receive([Commands.FORWARD]);
      expect(rover.getPosition()).toStrictEqual(new Point(0, 0));
    });
  });

  describe('Implement obstacle detection before each move to a new square. If a given sequence of commands encounters an obstacle, the rover moves up to the last possible point, aborts the sequence and reports the obstacle.', () => {
    it('should create obstacles for rover', () => {
      const obstacles: Obstacle[] = [new Obstacle(5, 5), new Obstacle(3, 7)];
      const rover: Rover = new Rover(
        Directions.NORTH,
        new Point(12, 21),
        new Grid(12, 33),
        obstacles,
      );
      expect(rover.getObstacles()).toEqual([
        new Obstacle(5, 5),
        new Obstacle(3, 7),
      ]);
    });

    it('should use empty array when obstacles are not assigned', () => {
      const rover: Rover = new Rover(Directions.NORTH, new Point(12, 21));
      expect(rover.getObstacles()).toEqual([]);
    });

    it('should not move to the obstacle', () => {
      const obstacles: Obstacle[] = [new Obstacle(5, 1), new Obstacle(3, 0)];

      const rover: Rover = new Rover(
        Directions.EAST,
        new Point(0, 0),
        null,
        obstacles,
      );
      rover.receive([Commands.FORWARD, Commands.FORWARD, Commands.FORWARD]);
      expect(rover.getPosition()).toStrictEqual(new Point(2, 0));
    });

    it('should abort the sequence ', () => {
      const obstacles: Obstacle[] = [new Obstacle(5, 1), new Obstacle(3, 0)];

      const rover: Rover = new Rover(
        Directions.EAST,
        new Point(0, 0),
        null,
        obstacles,
      );
      expect(
        rover.receive([Commands.FORWARD, Commands.FORWARD, Commands.FORWARD]),
      ).toEqual(false);
    });

    it('should report the obstacle', () => {
      const obstacles: Obstacle[] = [new Obstacle(5, 1), new Obstacle(3, 0)];

      const rover: Rover = new Rover(
        Directions.EAST,
        new Point(0, 0),
        null,
        obstacles,
      );
      rover.receive([Commands.FORWARD, Commands.FORWARD, Commands.FORWARD]);
      expect(rover.lastObstacle).toStrictEqual(new Obstacle(3, 0));
    });
  });
});
