import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Coffee {
    @Field(() => ID)
    id: string;
    name: string;
    brand: string;
    flavors: string[];
}
