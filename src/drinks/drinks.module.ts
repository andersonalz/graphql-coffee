import { Module } from '@nestjs/common';
import { DrinksResolver } from './drinks.resolver';
import { DrinksService } from './drinks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from 'src/coffees/entities/coffee.entity';
import { Tea } from 'src/teas/entities/tea.entity/tea.entity';

@Module({
    imports:[
        TypeOrmModule.forFeature([Coffee , Tea])
    ],
    providers:[DrinksService, DrinksResolver]
})
export class DrinksModule {}
