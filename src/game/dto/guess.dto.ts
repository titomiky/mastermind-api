import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsDate, IsNumber } from 'class-validator';

export class Guess {
    
    @ApiProperty({ description: 'game Id'})
    @IsNumber()
    gameId: number;
            
    @ApiProperty({ description: 'guess'})
    @IsString()
    guess: string;
    

}