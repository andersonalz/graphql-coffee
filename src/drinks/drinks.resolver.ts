import { Resolver, Query } from '@nestjs/graphql';
import { Drink } from 'src/common/interfaces/drink.interface/drink.interface';
import { DrinkResultUnion } from './common/unions/drink-result.union';
import { Coffee } from 'src/coffees/entities/coffee.entity';
import { Tea } from 'src/teas/entities/tea.entity/tea.entity';
import { DrinksService } from './drinks.service';
import { Inject } from '@nestjs/common';

@Resolver()
export class DrinksResolver {
    constructor(
        private readonly drinksService: DrinksService
    ) { }

    @Query(() => [DrinkResultUnion], { name: 'drinks', description: 'Get all drinks' })
    async findAll(): Promise<typeof DrinkResultUnion[]> {
        return this.drinksService.findAll();
    }
}
