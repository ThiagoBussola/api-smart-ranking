import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DesafiosController } from './desafios.controller';
import { DesafiosService } from './desafios.service';
import { DesafioSchema } from './interfaces/desafio.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Desafios', schema: DesafioSchema} ])],
  controllers: [DesafiosController],
  providers: [DesafiosService]
})
export class DesafiosModule {}
