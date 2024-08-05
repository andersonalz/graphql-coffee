import { CustomScalar, Scalar } from "@nestjs/graphql";
import { Kind, ValueNode } from "graphql";

@Scalar('Date', type => Date) // two parameter first is name of type and second is function that return type 
export class DateScalar implements CustomScalar<number, Date> {
    //first one it according to type of the value being sent from the client
    //and a second one indicating the type of value being sent back to the client.

    description = "Date custom scalar type";
    parseValue(value: number): Date{
        return new Date(value);
    }// this method will be executed after the request is receive from the client
    
    serialize(value: Date): number{
        return value.getTime();
    }; //this method will be executed before the response send back to the client
    
    parseLiteral(ast: ValueNode): Date{
        if(ast.kind === Kind.INT){
            return new Date(ast.value);
        }
        return null;
    }
}
