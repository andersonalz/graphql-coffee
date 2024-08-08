import { InjectRepository } from "@nestjs/typeorm";
import { Coffee } from "src/coffees/entities/coffee.entity";
import { Tea } from "src/teas/entities/tea.entity/tea.entity";
import { Repository } from "typeorm";
import { DrinkResultUnion } from "./common/unions/drink-result.union";

export class DrinksService {
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
        @InjectRepository(Tea)
        private readonly teaRepository: Repository<Tea>
    ) { }

    async findAll(): Promise<typeof DrinkResultUnion[]> {
        const coffees = await this.coffeeRepository.find()
        const teas = await this.teaRepository.find()
        return [...coffees, ...teas]
    }
}
