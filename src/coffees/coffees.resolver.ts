import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Coffee } from './entities/coffee.entity/coffee.entity';
import { CreateCoffeeInput } from './dto/coffee.dto';

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

    @Mutation(() => Coffee, { name: 'createCoffee', nullable: true })
    async create(@Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInput) {
        return null
    }
}

