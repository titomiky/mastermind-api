
import { GamesGuessPegsDTO } from "../games.guess.pegs.dto";

export class GamesStateDTO {
            
    gameId: number;        
    gameCode: string;   
    gameGuessess: Array<GamesGuessPegsDTO>;
}