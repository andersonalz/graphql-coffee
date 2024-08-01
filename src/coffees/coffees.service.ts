import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { UpdateCoffeeInput } from './dto/update.coffee.dto';

@Injectable()
//with mock data
// export class CoffeesService {
//     constructor() {

//     }

//     coffees: Coffee[] = [];
//     async findAll() {
//         return this.coffees;
//     }

//     async findOne(id: number) {
//         return this.coffees.find(coffee => coffee.id === `${id}`);
//     }

//     async create(createCoffeeInput: CreateCoffeeInput) {
//         this.coffees.push({
//             id :"1",
//             name :createCoffeeInput.name,
//             brand :createCoffeeInput.brand,
//             flavors :createCoffeeInput.flavors
//         });
//         return createCoffeeInput;
//     }
// }
export class CoffeesService {
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>
    ) { }

    coffees: Coffee[] = [];
    async findAll() {
        return this.coffeeRepository.find();
    }

    async findOne(id: number) {
        const coffee =  await this.coffeeRepository.findOne({
            where: {
                id: id
            }
        });

        if (!coffee) {
            throw new UserInputError(`Coffee #${id} not found`);
        }
        
        return coffee;
    }

    async create(createCoffeeInput: CreateCoffeeInput) {
        const coffee = this.coffeeRepository.create(createCoffeeInput);
        return this.coffeeRepository.save(coffee);
    }

    async update(id: number, updateCoffeeInput: UpdateCoffeeInput) {
        const updateCoffee = await this.coffeeRepository.preload({
            id,
            ...updateCoffeeInput
        })

        if(!updateCoffee){
            throw new UserInputError(`Coffee #${id} not found`);
        }
        return updateCoffee
    }
    
    async delete(id: number) {
        const coffee = await this.coffeeRepository.findOne({
            where: {
                id
            }
        });
        return this.coffeeRepository.remove(coffee);
    }
}

