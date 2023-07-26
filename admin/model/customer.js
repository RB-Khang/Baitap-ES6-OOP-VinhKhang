import { Person } from "./person.js";
export class Customer extends Person {
    constructor(_maNd, _name, _adress, _email, _tenCty, _hoaDon) {
        super(_maNd, _name, _adress, _email)
        this.tenCty = _tenCty
        this.hoaDon = _hoaDon
        this.typeRole = 'customer'
    }
    danhGia() {
        if (this.hoaDon < 10000000) {
            return 'Đối tác trung bình'
        } else if (this.hoaDon < 200000000) {
            return 'Đối tác tiềm năng'
        } else return 'Đối tác VIP'
    }
    mapTypeRole() {
        return "Khách hàng"
    }
}