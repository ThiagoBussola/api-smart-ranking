import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@Injectable()
export class CategoriasService {

    constructor(@InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
        private readonly jogadoresService: JogadoresService
    ){}

    async criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria>{
        const { categoria } = criarCategoriaDto

        const findCategory = await this.categoriaModel.findOne({categoria})

        if(findCategory) {
            throw new BadRequestException(`Categoria ${categoria} já está cadastrada!`)
        }

        const categoriaCriada = new this.categoriaModel(criarCategoriaDto)

        return categoriaCriada.save()
    }

    async consultarTodasCategorias(): Promise<Array<Categoria>> {
        return await this.categoriaModel.find().populate('jogadores')
    }

    async consultarCategoriaPeloId(categoria): Promise<Categoria>{
        const categoriaEncontrada = await this.categoriaModel.findOne({categoria: categoria})

        if(!categoriaEncontrada) {
            throw new NotFoundException(`A categoria ${categoria} não foi encontrada!`)
        }

        return categoriaEncontrada
    }

    async atualizarCategoria(categoria: string, atualizarCategoriaDto: AtualizarCategoriaDto): Promise<Categoria> {

        const categoriaEncontrada = await this.categoriaModel.findOne({categoria: categoria})

        if(!categoriaEncontrada) {
            throw new NotFoundException(`A Categoria ${categoria} não foi encontrada!`)
        }

        return await this.categoriaModel.findOneAndUpdate({categoria}, {
            $set: atualizarCategoriaDto
        }, {new: true})
    }

    async atribuirCategoriaJogador(params: string[]): Promise<Categoria> {

        const categoria = params['categoria']
        const idJogador = params['idJogador']

        const categoriaEncontrada = await this.categoriaModel.findOne({categoria})

        const jogadorCadastradoCategoria = await this.categoriaModel.find({categoria}).where('jogadores').in(idJogador)

        await this.jogadoresService.consultarJogadorPeloId(idJogador)

        if(!categoriaEncontrada) {
            throw new NotFoundException(`Categoria ${categoria} não encontrada!`)
        }

        if(jogadorCadastradoCategoria.length) {
            throw new BadRequestException(`Jogador ${idJogador} já cadastrado na Categoria ${categoria}`)
        }

        categoriaEncontrada.jogadores.push(idJogador)

        return await this.categoriaModel.findOneAndUpdate({categoria}, {
            $set: categoriaEncontrada
        }, {new: true})
    }
}
