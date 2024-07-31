import { Field, InputType, ObjectType } from "@nestjs/graphql";

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
    @Field(() => [String] ,{description: 'Coffee flavors'})
    flavors: string[];
}
