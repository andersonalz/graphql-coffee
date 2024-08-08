import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Tea } from "./entities/tea.entity/tea.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TeasService {
    constructor(
        @InjectRepository(Tea)
        private readonly teaRepository: Repository<Tea>
    )
    {}

    async findAll(): Promise<Tea[]>{
        return this.teaRepository.find();
    }
}
