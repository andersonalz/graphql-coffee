import { Injectable } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/coffee.dto';
import { Coffee } from './entities/coffee.entity/coffee.entity';

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
        
    ) {}

    coffees: Coffee[] = [];
    async findAll() {
        return [];
    }

    async findOne(id: number) {
        return null;
    }

    async create(createCoffeeInput: CreateCoffeeInput) {
        return null;
    }
}

