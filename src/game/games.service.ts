import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GamesEntity } from './entity/games.entity';
import { GamesDTO } from './dto/games.dto';


@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(GamesEntity)
    private GamesRepository: Repository<GamesEntity>,    
  ) {}

  async showAll() {
    return await this.GamesRepository.find();
  }

  async create(data: GamesDTO) {
    const game = this.GamesRepository.create(data);
    await this.GamesRepository.save(game);
    return game;
  }


  async findById(gameId: number): Promise<GamesDTO> {
    return await this.GamesRepository.findOne({
      where: {
        id: gameId,
      },
    });
  }

  async read(id: number) {
    return await this.GamesRepository.findOne({ where: { id: id } });
  }

  async update(id: number, data: Partial<GamesDTO>) {
    await this.GamesRepository.update({ id }, data);
    return await this.GamesRepository.findOne({ id });
  }

  async destroy(id: number) {
    await this.GamesRepository.delete({ id });
    return { deleted: true };
  }

  public randomColor() : string {
    const list = "RBYGWO";    
    var rnd = Math.floor(Math.random() * list.length);    
    return list.charAt(rnd);
  }

  public generateRandomCode( ){
    const maxColors = 4;
    var res = "";
    for (var i = 0; i < maxColors; i++) {
      res += this.randomColor();
    }
    return res;
  }

}