import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Flavor } from "../entities/flavor.entity";

@ObjectType({ isAbstract: true })
@InputType({
    description : 'Create Coffee Input type object',
    isAbstract : false
})
export class CreateCoffeeInput {
    @Field({ description: 'Coffee name' })
    name: string;
    
    @Field({ description: 'Coffee brand' })
    brand: string;
    
    coffeeType?: string;

    @Field(() => [String] ,{description: 'Coffee flavors'})
    flavors: String[];
}
