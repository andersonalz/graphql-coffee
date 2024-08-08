import { Field, ObjectType } from "@nestjs/graphql";
import { Drink } from "src/common/interfaces/drink.interface/drink.interface";


@ObjectType({ implements: () => Drink , description: 'Tea'})
export class Tea implements Drink {
    name: string;
    brand: string;
    weight: number;
}
