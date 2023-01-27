import { Module } from '@nestjs/common';
import { Rover } from './rover';

@Module({
  providers: [Rover],
  exports: [Rover],
})
export class RoverModule {}
