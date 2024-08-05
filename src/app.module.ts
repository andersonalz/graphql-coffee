import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateScalar } from './common/scalars/date.scalar/date.scalar';

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
      // buildSchemaOptions : {
      //   numberScalarMode: 'integer',
      //   dateScalarMode: 'timestamp',
      // }
    }),
    CoffeesModule],
  controllers: [AppController],
  providers: [AppService , DateScalar],
})
export class AppModule { }
