import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';

import { GamesModule } from './game/games.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: './config/config.env',
    isGlobal: true,
  }),  
  TypeOrmModule.forRootAsync(
    {
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }
  ), GamesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
