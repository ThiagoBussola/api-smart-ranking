import { Body, Controller, Logger, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarCategoriaDto } from 'src/categorias/dtos/criar-categoria.dto';
import { DesafiosService } from './desafios.service';
import { Desafio } from './interfaces/desafio.interface';

@Controller('desafios')
export class DesafiosController {

    constructor(private readonly desafiosService: DesafiosService) {}

    private readonly logger = new Logger(DesafiosController.name)

    @Post()
    @UsePipes(ValidationPipe)
    async criarDesafio(@Body() criarDesafioDto: CriarCategoriaDto): Promise<Desafio> {
        this.logger.log(`criarDesafioDto: ${JSON.stringify(criarDesafioDto)}`)

        return await this.desafiosService.criarDesafio(criarDesafioDto)
    }

}
