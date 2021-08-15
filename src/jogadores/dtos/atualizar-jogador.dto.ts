import { IsNotEmpty } from 'class-validator'

export class AtualizarJogadorDto {

    readonly telefoneCelular:string

    @IsNotEmpty()
    nome: string
}