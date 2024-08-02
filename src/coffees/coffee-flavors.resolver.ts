import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Resolver(() => Coffee)
export class CoffeeFlavorsResolver {
    constructor(
        @InjectRepository(Flavor)
        private readonly flavorRepository: Repository<Flavor>,
    ){}
    @ResolveField("flavors" , () => [Flavor])
    async resolverFlavor(@Parent() coffee: Coffee){
    return this.flavorRepository
           .createQueryBuilder('flavor')
           .innerJoin('flavor.coffees' , 'coffee' , 'coffee.id = :coffeeId', {
              coffeeId: coffee.id
            })
            .getMany()
    }
}
