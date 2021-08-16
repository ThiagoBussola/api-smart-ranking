import { Injectable, Logger } from '@nestjs/common';
import { CategoriasService } from 'src/categorias/categorias.service';
import { CriarCategoriaDto } from 'src/categorias/dtos/criar-categoria.dto';
import { Desafio } from './interfaces/desafio.interface';

@Injectable()
export class DesafiosService {

    constructor (private readonly categoriasService: CategoriasService) {}

    private readonly logger = new Logger(DesafiosService.name)
    

    async criarDesafio(criarDesafioDto: CriarCategoriaDto): Promise<Desafio> {

        return
    }
}
