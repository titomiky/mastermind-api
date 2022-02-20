import { Controller, Get, Post, Patch, Delete, Body, Param, HttpStatus, Req, ConsoleLogger, Query } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesDTO } from './dto/games.dto';

import { ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Request, Response as Res } from 'express';
import { Guess } from './dto/guess.dto';
import { GamesGuessService } from './games.guess.service';
import { GamesGuessDTO } from './dto/games.guess.dto';
import { GamesEntity } from './entity/games.entity';
import { GamesGuessPegsDTO } from './games.guess.pegs.dto';
import { GamesStateDTO } from './dto/games.state.dto';



@Controller('games')
export class GamesController {
  constructor(private GamesService: GamesService, private GamesGuessService: GamesGuessService) {}

  @ApiTags('MasterMind')
  @ApiOperation({
      summary: 'Create a new game',
      deprecated: false,
      description: 'This method create a new game',
  })
  @ApiOkResponse({ description: 'Ok' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Post('newGame')  
  public async newGame(@Body() data: GamesDTO, @Req() req: Request) {
      data.code = this.GamesService.generateRandomCode();
      const game = await this.GamesService.create(data);
    return {
      statusCode: HttpStatus.OK,
      message: 'Game created successfully',
      gameId: game.id
    };
  }

  @ApiTags('MasterMind')
  @ApiOperation({
      summary: 'Create a new guess',
      deprecated: false,
      description: 'This method create a new guess (R)ed, (B)lue, (Y)ellow, (G)reen, (W)hite, (O)range',
  })
  @ApiOkResponse({ description: 'Ok' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Post('newGuess')
  public async newGuess ( @Body() guess: GamesGuessDTO, @Req() req: Request ) {
    
    const guessCreated = await this.GamesGuessService.create(guess);
    const game = await this.GamesService.findById(guess.gameId);    

    return {
      statusCode: HttpStatus.OK,
      message: 'Game guess created successfully',
      blackPegs: this.GamesGuessService.getBlackPegs(game.code, guess.guess),
      whitePegs: this.GamesGuessService.getWhitePegs(game.code, guess.guess),
    };
  }

  @ApiTags('MasterMind')
  @ApiOperation({
      summary: 'Get the progress for a specific game',
      deprecated: false,
      description: 'This method gets the status of a specific game',
  })
  @ApiOkResponse({ description: 'Ok' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiQuery({ name: 'gameId', isArray: false, required: true, type: Number })  
  @Get('state')   
  public async currentState(@Query('gameId') gameId: number) {    
    const game =  await this.GamesService.findById(gameId);
    const gameGuesses = await this.GamesGuessService.findAllById(game.id);
    
    var gamesStatus = new  GamesStateDTO();
    gamesStatus.gameGuessess = [];
    for (var gameGuess of gameGuesses) {
      gamesStatus.gameId = game.id;
      gamesStatus.gameCode = game.code;

      if (gameGuess != undefined) {

        var gameGuessPeg  = new GamesGuessPegsDTO();
        gameGuessPeg.gameId = game.id;
        gameGuessPeg.guess = gameGuess.guess;
        gameGuessPeg.blackPegs = this.GamesGuessService.getBlackPegs(game.code, gameGuess.guess);
        gameGuessPeg.whitePegs = this.GamesGuessService.getWhitePegs(game.code, gameGuess.guess);
        
        gamesStatus.gameGuessess.push(gameGuessPeg);      
      }
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Games fetched successfully',
      gamesStatus
    };
  }


  @ApiTags('MasterMind')
  @Delete(':id')
  public async deleteGame(@Param('id') id: number) {
    await this.GamesService.destroy(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Game deleted successfully',
    };
  }
}