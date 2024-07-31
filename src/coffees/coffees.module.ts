import { Module } from '@nestjs/common';
import { CoffeesResolver } from './coffees.resolver';
import { CoffeeModuleModule } from './coffee.module/coffee.module.module';
import { CoffeesService } from './coffees.service';

@Module({
  providers: [CoffeesResolver, CoffeesService],
  imports: [CoffeeModuleModule]
})
export class CoffeesModule {}
