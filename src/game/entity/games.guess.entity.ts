import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity('gamesGuess')
export class GamesGuessEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    gameId: number;
    
    @Column()
    guess: string;        
}
