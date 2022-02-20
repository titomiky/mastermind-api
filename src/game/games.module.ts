import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { GamesEntity } from './entity/games.entity';
import { GamesGuessService } from './games.guess.service';
import { GamesGuessEntity } from './entity/games.guess.entity';

  @Module({
    imports: [TypeOrmModule.forFeature([GamesEntity]), TypeOrmModule.forFeature([GamesGuessEntity])],
    controllers: [GamesController],
    providers: [GamesService, GamesGuessService],
  })
  export class GamesModule {}