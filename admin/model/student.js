import { Person } from "./person.js";
export class Student extends Person {
    constructor(_maNd, _name, _adress, _email, _diemToan, _diemLy, _diemHoa) {
        super(_maNd, _name, _adress, _email)
        this.diemToan = _diemToan
        this.diemLy = _diemLy
        this.diemHoa = _diemHoa
        this.typeRole = 'student'
    }
    diemTrungBinh() {
        return (this.diemToan + this.diemLy + this.diemHoa) / 3
    }
    mapTypeRole(){
        return 'Sinh viên'
    }
}