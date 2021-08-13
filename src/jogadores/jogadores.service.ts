import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import {Jogador} from './interfaces/jogador.interface'
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JogadoresService {

    private jogadores: Jogador[] = []
    private readonly logger = new Logger(JogadoresService.name)
    
    async criarAtualizarJogador(criaJogadorDto: CriarJogadorDto): Promise<void> {
        
        const { email } = criaJogadorDto

        const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email)

        if(jogadorEncontrado) {
            return this.atualizar(jogadorEncontrado, criaJogadorDto)
        } else {
            this.criar(criaJogadorDto)
        }

    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return await this.jogadores
    }

    private criar(criaJogadorDto: CriarJogadorDto): void {
        const {nome, email, telefoneCelular} = criaJogadorDto

        const jogador: Jogador = {
            _id: uuidv4(),
            nome,
            email,
            telefoneCelular,
            ranking: 'A',
            posicaoRanking: 2,
            urlFotoJogador:'www.foto.com.br'
        }
        this.logger.log(`criaJogadorDto: ${JSON.stringify(jogador)}`)
        this.jogadores.push(jogador)
    }

    private atualizar(jogadorEncontrado: Jogador, criaJogadorDto: CriarJogadorDto): void {
        const { nome } = criaJogadorDto

        jogadorEncontrado.nome = nome
    }

}
