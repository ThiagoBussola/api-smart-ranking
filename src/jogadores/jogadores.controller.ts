import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { CriarJogadorDto } from './dtos/criar-jogador.dto'
import { Jogador } from './interfaces/jogador.interface';
import {JogadoresService}  from './jogadores.service'

@Controller('jogadores')
export class JogadoresController {
  
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(@Body() criaJogadorDto: CriarJogadorDto ) {
    return await this.jogadoresService.criarJogador(criaJogadorDto)
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(@Param('_id', ValidacaoParametrosPipe) _id: string, @Body() atualizarJogadorDto: AtualizarJogadorDto): Promise<Jogador> {
    return await this.jogadoresService.atualizarJogador(_id, atualizarJogadorDto)
  }

  @Get()
  async consultarJogadores(): Promise<Jogador[]>{
      return await this.jogadoresService.consultarTodosJogadores()
  }

  @Get('/:_id')
  async consultarJogadorPeloId( @Param('_id', ValidacaoParametrosPipe) _id: string): Promise<Jogador>{
      return await this.jogadoresService.consultarJogadorPeloId(_id)
  }

  @Delete('/:_id')
  async deletarJogador(@Param('_id', ValidacaoParametrosPipe) _id: string): Promise<Jogador> {
    return await this.jogadoresService.deletarJogador(_id)
  }
}