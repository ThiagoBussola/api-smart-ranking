import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import {Jogador} from './interfaces/jogador.interface'
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundError } from 'rxjs';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';

@Injectable()
export class JogadoresService {

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>){}

    async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        
        const { email } = criarJogadorDto

        const jogadorEncontrado = await this.jogadorModel.findOne({email: email})

        if(jogadorEncontrado) {
            throw new BadRequestException(`Jogador com email ${email}, já cadastrado`)
        } 
        
        const jogadorCriado = new this.jogadorModel(criarJogadorDto)

        return await jogadorCriado.save()
    }

    async atualizarJogador(_id: string, atualizarJogadorDto: AtualizarJogadorDto): Promise<Jogador> {
        await this.playerExists(_id)

        return await this.jogadorModel.findByIdAndUpdate(_id, { $set: atualizarJogadorDto }, {new: true})
    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return await this.jogadorModel.find()
    }

    async consultarJogadorPeloId(_id: string): Promise<Jogador> {

        const jogadorEncontrado = await this.playerExists(_id)

        return jogadorEncontrado
    }

    async deletarJogador(_id: string): Promise<any> {

        await this.playerExists(_id)

        return await this.jogadorModel.findByIdAndRemove(_id)
    }

    private async playerExists(_id: string): Promise<Jogador> {
        const findedPlayer = await this.jogadorModel.findById(_id)

        if(!findedPlayer) {
            throw new NotFoundException(`Jogador com o id: ${_id} não encontrado`)
        }

        return findedPlayer
    }
}
