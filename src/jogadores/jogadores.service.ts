import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import {Jogador} from './interfaces/jogador.interface'
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>){}

    async criarAtualizarJogador(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
        
        const { email } = criaJogadorDto

        //const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email)

        const jogadorEncontrado = await this.jogadorModel.findOne({email: email})

        if(jogadorEncontrado) {
            return await this.atualizar(criaJogadorDto)
        } else {
            return this.criar(criaJogadorDto)
        }

    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return await this.jogadorModel.find()
    }

    async consultarJogadorPeloEmail(email: string): Promise<Jogador> {
        const jogadorEncontrado = await this.jogadorModel.findOne({email: email})
        
        if(!jogadorEncontrado) {
            throw new NotFoundException(`jogador com email ${email} não foi encontrado`)    
        }
        return jogadorEncontrado
    }

    private async criar(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {

        const jogadorCriado = new this.jogadorModel(criaJogadorDto)

        return await jogadorCriado.save()
    }

    private async atualizar(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
        return await this.jogadorModel.findOneAndUpdate({email: criaJogadorDto.email}, {
            $set: criaJogadorDto
        }, {new: true})
    }

    async deletarJogador(email: string): Promise<any> {

        return await this.jogadorModel.findOneAndDelete({email: email})
    }
}
