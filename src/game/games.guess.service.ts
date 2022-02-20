import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GamesEntity } from './entity/games.entity';
import { GamesDTO } from './dto/games.dto';
import { Guess } from './dto/guess.dto';
import { GamesGuessEntity } from './entity/games.guess.entity';
import { GamesGuessDTO } from './dto/games.guess.dto';

@Injectable()
export class GamesGuessService {
  constructor(
    @InjectRepository(GamesGuessEntity)
    private GamesGuessRepository: Repository<GamesGuessEntity>,    
  ) {}


  async create(data: GamesGuessDTO) {
    const gameGuess = this.GamesGuessRepository.create(data);
    await this.GamesGuessRepository.save(gameGuess);
    return gameGuess;
  }

  async showAll() {
    return await this.GamesGuessRepository.find();
  }


  async findById(gameId: number): Promise<GamesGuessDTO> {
    return await this.GamesGuessRepository.findOne({
      where: {
        id: gameId,
      },
    });
  }

  async findAllById(gameId: number): Promise<GamesGuessDTO[]> {
    return await this.GamesGuessRepository.createQueryBuilder("gamesGuess").where("gamesGuess.gameId = :gameId", { gameId: gameId }).getMany();  
  }
  


  public getBlackPegs( gameCode, guessCode ){
    var res = 0;
    for (var i = 0; i < gameCode.length; i++) {
      if (gameCode[i] == guessCode[i]) res++;      
    }
    return res;
  }

  public getWhitePegs( gameCode, guessCode ){
    var res = 0;
    for (var i = 0; i < guessCode.length; i++) {
      if (guessCode.indexOf(gameCode[i]) !== -1) res++;
    }
    return res;
  }


}