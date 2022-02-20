import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity('games')
export class GamesEntity {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    code: string;        
}