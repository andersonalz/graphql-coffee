import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeInput } from './dto/coffee-create.dto';
import { CoffeesService } from './coffees.service';
import { UpdateCoffeeInput } from './dto/coffee-update.dto';
import { ParseIntPipe } from '@nestjs/common';

@Resolver()
export class CoffeesResolver {
    constructor(
        private readonly coffeesService: CoffeesService
    ) { }

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

    @Mutation(() => Coffee, { name: 'createCoffee' })
    async create(@Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInput) {
        return this.coffeesService.create(createCoffeeInput)
    }

    @Mutation(() => Coffee, { name: "updateCoffee" })
    async update(@Args('id', ParseIntPipe) id: number, @Args('updateCoffeeInput') updateCoffeeInput: UpdateCoffeeInput) {
        return this.coffeesService.update(id, updateCoffeeInput)
    }

    @Mutation(() => Coffee, { name: "deleteCoffee" })
    async delete(@Args('id', ParseIntPipe) id: number) {
        return this.coffeesService.delete(id)
    }
}

