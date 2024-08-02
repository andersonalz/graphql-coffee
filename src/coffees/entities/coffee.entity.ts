import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Flavor } from "./flavor.entity";

@Entity()
@ObjectType({description : "Coffee Model"})
export class Coffee {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column()
    name: string;
    
    @Column()
    brand: string;

    @JoinTable()
    @ManyToMany((type) => Flavor, flavor => flavor.coffees, { cascade: true })
    flavors?: Flavor[];
}
