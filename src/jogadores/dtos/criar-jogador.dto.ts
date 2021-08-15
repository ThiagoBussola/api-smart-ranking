import { IsEmail, IsNotEmpty } from 'class-validator'

export class CriarJogadorDto {

    readonly telefoneCelular:string

    @IsEmail()
    readonly email: string

    @IsNotEmpty()
    nome: string
}