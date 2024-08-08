import { Resolver, Query} from '@nestjs/graphql';
import { Tea } from './entities/tea.entity/tea.entity';
import { TeasService } from './teas.service';


@Resolver()
export class TeasResolver {
    constructor(
      private readonly teaService:TeasService,
    ){}

    @Query(() => [Tea], {name: 'teas' ,description: 'return all teas'})
    async findAll(): Promise<Tea[]> {
        return this.teaService.findAll();
    }

    @Query(() => Tea, {name: 'tea', description: 'return one tea'})
    async findOne(): Promise<Tea>{
        return ;
    }
}
