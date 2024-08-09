import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Coffee } from 'src/coffees/entities/coffee.entity';
import { Flavor } from 'src/coffees/entities/flavor.entity';
import { In, Repository } from 'typeorm';

@Injectable({scope: Scope.REQUEST})
export class FlavorsByCoffeeLoader extends DataLoader<number , Flavor[]> {
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
    ) {
        super((keys)=> this.batchLoadFn(keys)) // keys is an array of coffees id
    }
    
    private async batchLoadFn(coffeeId: readonly number[]): Promise<Flavor[][]> {
        const coffeesWithFlavor = await this.coffeeRepository.find({
            select: ['id'],
            relations: {
                flavors: true
            },
            where: {
                id: In(coffeeId as number[])
            }
        })

        return coffeesWithFlavor.map(coffee => coffee.flavors)
    }
}
