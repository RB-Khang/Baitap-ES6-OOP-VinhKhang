import { Student } from "../model/student.js";
import { Employee } from "../model/employee.js";
import { Customer } from "../model/customer.js";
export class ListPerson{
    constructor(){
        this.arrPerson =[]
    }
    addPerson(person){
        this.arrPerson.push(person)
    }
}