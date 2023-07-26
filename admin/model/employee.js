import { Person } from "./person.js";
export class Employee extends Person{
    constructor(_maNd,_name,_adress,_email,_ngayLam,_luongNgay){
        super(_maNd,_name,_adress,_email)
        this.ngayLam = _ngayLam
        this.luongNgay = _luongNgay
        this.typeRole = 'employee'
    }
    tinhLuong(){
        return this.ngayLam*this.luongNgay
    }
    mapTypeRole(){
        return "Giảng viên"
    }
}