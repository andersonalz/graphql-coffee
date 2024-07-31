import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Coffee } from './entities/coffee.entity/coffee.entity';
import { CreateCoffeeInput } from './dto/coffee.dto';
import { CoffeesService } from './coffees.service';

@Resolver()
export class CoffeesResolver {
    constructor(
        private readonly coffeesService: CoffeesService
    ) {}
    
    @Query(() => [Coffee], { name: 'coffees' })
    async findAll() {
        return this.coffeesService.findAll()
    }

    @Query(() => Coffee, {
        name: 'coffee',
        description: "return One Coffee",
        nullable: true
    })
    async findOne(@Args('id', { type: () => ID }) id: number) {
        return this.coffeesService.findOne(id)
    }

    @Mutation(() => Coffee, { name: 'createCoffee', nullable: true })
    async create(@Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInput) {
        return this.coffeesService.create(createCoffeeInput)
    }
}

