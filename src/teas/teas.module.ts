import { Module } from '@nestjs/common';
import { TeasResolver } from './teas.resolver';
import { TeasService } from './teas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tea } from './entities/tea.entity/tea.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Tea])
    ],
    providers: [TeasResolver, TeasService],
})
export class TeasModule {

}
