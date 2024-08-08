import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateScalar } from './common/scalars/date.scalar/date.scalar';
import { Tea } from './teas/entities/tea.entity/tea.entity';
import { DrinksResolver } from './drinks/drinks.resolver';
import { TeasResolver } from './teas/teas.resolver';
import { TeasModule } from './teas/teas.module';
import { DrinksModule } from './drinks/drinks.module';

@Module({
  imports: [
    //when set name property typeorm can not find any repository and throw this error " Nest can't resolve dependencies of the CoffeesService (?). Please make sure that the argument "CoffeeRepository" at index [0] is available in the CoffeesModule context."
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "pass1234",
      database: "postgres-graph-ql",
      autoLoadEntities: true,
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions : {
        orphanedTypes: [Tea] //when we have a type that is not referenced to any resolver, query , mutation we need to tell graphql to include this type in the schema
      //   numberScalarMode: 'integer',
      //   dateScalarMode: 'timestamp',
      }
    }),
    CoffeesModule,
    TeasModule,
    DrinksModule],
  controllers: [AppController],
  providers: [AppService , DateScalar],
})
export class AppModule { }
