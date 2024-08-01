import { Field, InputType } from "@nestjs/graphql";

@InputType({
    description: 'update Coffee Input type object'
})
export class UpdateCoffeeInput {
    @Field({ description: 'Coffee name' , nullable: true })
    name: string;
    @Field({description: "Coffee brand", nullable: true})
    brand: string;
    @Field(() => [String] , {description: "Coffee flavors", nullable: true})
    flavors: string[];
}