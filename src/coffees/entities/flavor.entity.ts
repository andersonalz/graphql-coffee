import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Coffee } from "./coffee.entity";

@ObjectType()
@Entity()
export class Flavor {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column()
    name: string;

    @JoinTable()
    @ManyToMany((type) => Coffee , coffee => coffee.flavors)
    coffees: Coffee[];
}
