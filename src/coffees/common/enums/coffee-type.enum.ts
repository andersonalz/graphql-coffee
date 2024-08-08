import { registerEnumType } from "@nestjs/graphql"

export const CoffeeType = {
    ARABICA: 'arabica',
    ROBUSTA: 'robusta',
}

registerEnumType(CoffeeType,{
    name: 'coffee type',
    description: 'The types of coffee accepted'
})