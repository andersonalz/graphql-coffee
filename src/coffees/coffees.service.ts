import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/coffee-create.dto';
import { Coffee } from './entities/coffee.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { UpdateCoffeeInput } from './dto/coffee-update.dto';
import { Flavor } from './entities/flavor.entity';

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
        private readonly coffeeRepository: Repository<Coffee>,
        @InjectRepository(Flavor)
        private readonly flavorRepository: Repository<Flavor>
    ) { }

    coffees: Coffee[] = [];
    async findAll() {
        return this.coffeeRepository.find();
    }

    async findOne(id: number) {
        const coffee = await this.coffeeRepository.findOne({
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
        const flavors = await Promise.all(
            createCoffeeInput.flavors.map((name: string) => this.preloadFlavorByName(name))
        )
        const coffee = this.coffeeRepository.create({
            ...createCoffeeInput,       
            flavors
        });
        return this.coffeeRepository.save(coffee);
    }

    async update(id: number, updateCoffeeInput: UpdateCoffeeInput) {
        let flavors :Flavor[]
        if (updateCoffeeInput.flavors) {
            flavors = await Promise.all(
                updateCoffeeInput.flavors.map((flavor: string) => this.preloadFlavorByName(flavor))
            )
        }
        const updateCoffee = await this.coffeeRepository.preload({
            id,
            ...updateCoffeeInput,
            flavors,
        })

        if (!updateCoffee) {
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


    private async preloadFlavorByName(name: string): Promise<Flavor> {
         const flavor = await this.flavorRepository.findOne({
            where : {
                name : name
            }
        })
        if (flavor) {
            return flavor;
        }
        const createFlavor = this.flavorRepository.create({ name })
        return this.flavorRepository.save(createFlavor);
    }
}

