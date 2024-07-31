import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Coffee } from './entities/coffee.entity/coffee.entity';

@Resolver()
export class CoffeesResolver {
    
    @Query(() => [Coffee], { name: 'coffees' })
    async findAll() {
        return []
    }

    @Query(() => Coffee, {
        name: 'coffee',
        description: "return One Coffee",
        nullable: true
    })
    async findOne(@Args('id', { type: () => ID }) id: string) {
        return null
    }
}

