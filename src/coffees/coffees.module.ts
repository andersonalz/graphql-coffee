import { Module } from '@nestjs/common';
import { CoffeesResolver } from './coffees.resolver';
import { CoffeeModuleModule } from './coffee.module/coffee.module.module';

@Module({
  providers: [CoffeesResolver],
  imports: [CoffeeModuleModule]
})
export class CoffeesModule {}
