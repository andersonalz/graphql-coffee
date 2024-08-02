import { Field, InputType } from "@nestjs/graphql";
import { MinLength } from "class-validator";
import { Flavor } from "../entities/flavor.entity";

@InputType({
    description: 'update Coffee Input type object'
})
export class UpdateCoffeeInput {
    @MinLength(3) // set validationPipe and install class-validator and use them for validation request body
    @Field({ description: 'Coffee name' , nullable: true })
    name: string;
    
    @Field({ description: "Coffee brand", nullable: true})
    brand: string;
   
    @Field(() => [String] ,{ description: "Coffee flavors", nullable: true})
    flavors: string[];
}