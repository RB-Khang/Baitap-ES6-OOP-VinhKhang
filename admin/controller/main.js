
//basic function
const getId = (id) => document.getElementById(id)
const getElements = (selector) => document.querySelectorAll(selector)


//import file
import { Customer } from "../model/customer.js";
import { Employee } from "../model/employee.js";
import { ListPerson } from "../model/listPerson.js";
import { Student } from "../model/student.js";




//Global variables
let listPerson = new ListPerson()
let btnThem = getId('btn__them')
const btnType = getId('personRole')
const addPersonBtn = getId('addPerson')
let btnSave = getId('editPerson')

//---------------------------LOCAL FUNCTION-----------------------
const setLocal = function () {
    let data = JSON.stringify(listPerson.arrPerson)
    localStorage.setItem('qlhv', data)
}

const getLocal = function () {
    let dataLocal = localStorage.getItem('qlhv')
    let parseData = JSON.parse(dataLocal)
    let arr = []
    parseData.forEach(value => {
        if (value.typeRole === 'student') {
            const { maNd, name, adress, email, diemToan, diemLy, diemHoa } = value
            const student = new Student(maNd, name, adress, email, diemToan, diemLy, diemHoa)
            arr.push(student)
        } else if (value.typeRole === 'customer') {
            const { maNd, name, adress, email, tenCty, hoaDon } = value
            const customer = new Customer(maNd, name, adress, email, tenCty, hoaDon)
            arr.push(customer)
        } else if (value.typeRole === 'employee') {
            const { maNd, name, adress, email, ngayLam, luongNgay } = value
            const employee = new Employee(maNd, name, adress, email, ngayLam, luongNgay)
            arr.push(employee)
        }
    })
    listPerson.arrPerson = arr
}





//-------------------------------RENDER FUNCTION------------------------
function renderListPerson(arr = listPerson.arrPerson) {
    let contenthtml = ''
    arr.forEach(value => {
        contenthtml += `
        <tr>
            <td>${value.maNd}</td>
            <td>${value.name}</td>
            <td>${value.mapTypeRole()}</td>
            <td>${value.adress}</td>
            <td>${value.email}</td>
            <td> <button class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#detailModal" onclick="detailNd('${value.maNd}')">Detail</button>
            <button class="btn btn-info"  onclick="modalEditNd('${value.maNd}')" data-bs-toggle="modal"
            data-bs-target="#adminModal">Edit</button>
                <button class="btn btn-danger" onclick="modalDeleteNd('${value.maNd}')">Delete</button>
                
            </td>
            </tr>
        `
    })
    getId('adminTableContent').innerHTML = contenthtml
}

btnType.onchange = function () {
    let inputChung = getElements('.inputChung')
    let inputStudent = getElements('.inputStudent')
    let inputEmployee = getElements('.inputEmployee')
    let inputCustomer = getElements('.inputCustomer')
    if (btnType.value === 'student') {
        inputChung.forEach(value => value.style.display = 'block')
        inputStudent.forEach(value => value.style.display = 'flex')
    } else if (btnType.value === 'employee') {
        inputChung.forEach(value => value.style.display = 'block')
        inputStudent.forEach(value => value.style.display = 'none')
        inputCustomer.forEach(value => value.style.display = 'none')
        inputEmployee.forEach(value => value.style.display = 'flex')
    } else if (btnType.value === 'customer') {
        inputChung.forEach(value => value.style.display = 'block')
        inputStudent.forEach(value => value.style.display = 'none')
        inputCustomer.forEach(value => value.style.display = 'flex')
        inputEmployee.forEach(value => value.style.display = 'none')
    } else {
        inputChung.forEach(value => value.style.display = 'none')
        inputStudent.forEach(value => value.style.display = 'none')
        inputCustomer.forEach(value => value.style.display = 'none')
        inputEmployee.forEach(value => value.style.display = 'none')
    }
}
//nút Thêm nhân viên
btnThem.onclick = function () {
    getId('editPerson').style.display = 'none'
    getId('adminForm').reset()
    getId('thongBao').innerHTML = 'Nhập thông tin chi tiết'
    getId('thongBao').style.display = 'none'
    getId('addPerson').style.display = 'inline-block'
    getId('maND').readOnly = false

    let inputChung = getElements('.inputChung')
    let inputStudent = getElements('.inputStudent')
    let inputEmployee = getElements('.inputEmployee')
    let inputCustomer = getElements('.inputCustomer')
    inputChung.forEach(value => value.style.display = 'none')
    inputStudent.forEach(value => value.style.display = 'none')
    inputCustomer.forEach(value => value.style.display = 'none')
    inputEmployee.forEach(value => value.style.display = 'none')
}

//---------------------------------------DATA FUNCTION------------------------
//chức năng lấy thông tin
const getInfoStudent = () => {
    let maND = getId('maND').value
    let tenND = getId('tenND').value
    let adressND = getId('adressND').value
    let emailND = getId('emailND').value
    let diemToan = getId('diemToan').value * 1
    let diemLy = getId('diemLy').value * 1
    let diemHoa = getId('diemHoa').value * 1
    return new Student(maND, tenND, adressND, emailND, diemToan, diemLy, diemHoa)
}

const getInfoEmployee = () => {
    let maND = getId('maND').value
    let tenND = getId('tenND').value
    let adressND = getId('adressND').value
    let emailND = getId('emailND').value
    let ngayLam = getId('ngayLam').value * 1
    let luongNgay = getId('luongNgay').value * 1
    return new Employee(maND, tenND, adressND, emailND, ngayLam, luongNgay)
}

const getInfoCustomer = () => {
    let maND = getId('maND').value
    let tenND = getId('tenND').value
    let adressND = getId('adressND').value
    let emailND = getId('emailND').value
    let tenCty = getId('tenCty').value
    let hoaDon = getId('giaHoadon').value * 1
    return new Customer(maND, tenND, adressND, emailND, tenCty, hoaDon)
}


//Chức năng thêm người dùng
addPersonBtn.onclick = function () {
    if (btnType.value === 'student') {
        let newstudent = getInfoStudent()
        listPerson.addPerson(newstudent)
    } else if (btnType.value === 'employee') {
        let employee = getInfoEmployee()
        listPerson.addPerson(employee)
    } else if (btnType.value === 'customer') {
        let customer = getInfoCustomer()
        listPerson.addPerson(customer)
    }
    setLocal()
    renderListPerson()
}

//-------------------------------------------EDIT DATABASE FUNCTION --------
//popUp info người dùng
window.modalEditNd = function (maNd) {
    getId('addPerson').style.display = 'none'
    getId('thongBao').innerHTML = 'Thay đổi thông tin chi tiết'
    getId('editPerson').style.display = 'inline-block'
    let inputChung = getElements('.inputChung')
    inputChung.forEach(value => value.style.display = 'block')

    let inputStudent = getElements('.inputStudent')
    let inputEmployee = getElements('.inputEmployee')
    let inputCustomer = getElements('.inputCustomer')
    listPerson.arrPerson.forEach(item => {
        if (item.maNd === maNd) {
            if (item.typeRole === 'student') {
                inputStudent.forEach(value => value.style.display = 'flex')
                inputCustomer.forEach(value => value.style.display = 'none')
                inputEmployee.forEach(value => value.style.display = 'none')
                getId('maND').value = item.maNd
                getId('maND').readOnly = true

                getId('tenND').value = item.name
                getId('adressND').value = item.adress
                getId('emailND').value = item.email
                getId('diemToan').value = item.diemToan
                getId('diemHoa').value = item.diemHoa
                getId('diemLy').value = item.diemLy

            } else if (item.typeRole === 'customer') {
                inputStudent.forEach(value => value.style.display = 'none')
                inputCustomer.forEach(value => value.style.display = 'flex')
                inputEmployee.forEach(value => value.style.display = 'none')
                getId('maND').value = item.maNd
                getId('maND').readOnly = true

                getId('tenND').value = item.name
                getId('adressND').value = item.adress
                getId('emailND').value = item.email
                getId('tenCty').value = item.tenCty
                getId('giaHoadon').value = item.hoaDon
            } else if (item.typeRole === 'employee') {
                inputStudent.forEach(value => value.style.display = 'none')
                inputCustomer.forEach(value => value.style.display = 'none')
                inputEmployee.forEach(value => value.style.display = 'flex')
                getId('maND').value = item.maNd
                getId('maND').readOnly = true

                getId('tenND').value = item.name
                getId('adressND').value = item.adress
                getId('ngayLam').value = item.ngayLam
                getId('luongNgay').value = item.luongNgay

            }
        }
    })
}
//Lưu thay đổi thông tin
btnSave.onclick = function () {
    let maND = getId('maND').value
    listPerson.arrPerson.forEach((value, index) => {
        if (value.maNd === maND) {
            if (value.typeRole === 'student') {
                let editPerson = getInfoStudent()
                listPerson.arrPerson.splice(index, 1, editPerson)
                setLocal()
                renderListPerson()
            } else if (value.typeRole === 'customer') {
                let editPerson = getInfoCustomer()
                listPerson.arrPerson.splice(index, 1, editPerson)
                setLocal()
                renderListPerson()
            } else if (value.typeRole === 'employee') {
                let editPerson = getInfoEmployee()
                listPerson.arrPerson.splice(index, 1, editPerson)
                setLocal()
                renderListPerson()
            }
        }
    })
}
//chức năng xoá người dùng
window.modalDeleteNd = function (maND) {
    listPerson.arrPerson.forEach((value, index) => {
        if (value.maNd === maND) {
            listPerson.arrPerson.splice(index, 1)
        }
    })
    setLocal()
    renderListPerson()
}

//Sort theo tên
const sortND = () => {
    getLocal()
    let arrSorted = listPerson.arrPerson.sort((a, b) => {
        let namea = a.name.toUpperCase()
        let nameb = b.name.toUpperCase()
        return namea.localeCompare(nameb)
    })
    console.log(arrSorted);
    renderListPerson(arrSorted)
}
getId('sortBtn').onchange = function () {
    if (getId('sortBtn').value === 'name') {
        sortND()
    } else if (getId('sortBtn').value === 'none') {
        getLocal()
        renderListPerson()
    }
}

//Filter theo role
const filterRole = function (role) {
    getLocal()
    let filtered = listPerson.arrPerson.filter((value, index, array) => {
        return value.typeRole === role
    })
    return filtered
}
getId('filterBtn').onclick = function () {
    const role = getId('filterBtn').value
    if (role !== 'none') {
        let filtered = filterRole(role)
        renderListPerson(filtered)
    }else renderListPerson()
}

// -----------------------------------MODAL DETAIL-----------------------
//modal detail
window.detailNd = (maND) => {
    listPerson.arrPerson.forEach(value => {
        if (value.maNd === maND) {
            if (value.typeRole === 'student') {
                getId('detailContent').innerHTML = `
                <table class="table table-borderless">
                    <tbody>
                        <tr>
                            <th>Tên người dùng:</th>
                            <th>${value.name}</th>
                        </tr>
                        <tr>
                            <td>Mã người dùng:</td>
                            <td>${value.maNd}</td>
                        </tr>
                        <tr>
                            <td>Địa chỉ:</td>
                            <td>${value.adress}</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>${value.email}</td>
                        </tr>
                        <tr>
                            <td>Điểm toán:</td>
                            <td>${value.diemToan}</td>
                        </tr>
                        <tr>
                            <td>Điểm lý:</td>
                            <td>${value.diemLy}</td>
                        </tr>
                        <tr>
                            <td>Điểm hoá:</td>
                            <td>${value.diemHoa}</td>
                        </tr>
                        <tr>
                            <td>Điểm trung bình</td>
                            <td>${value.diemTrungBinh().toFixed(2)}</td>
                        </tr>
                    </tbody>
                   </table>
                `
            } else if (value.typeRole === 'customer') {
                getId('detailContent').innerHTML = `
                <table class="table table-borderless">
                    <tbody>
                        <tr>
                            <th>Tên người dùng:</th>
                            <th>${value.name}</th>
                        </tr>
                        <tr>
                            <td>Mã người dùng:</td>
                            <td>${value.maNd}</td>
                        </tr>
                        <tr>
                            <td>Địa chỉ:</td>
                            <td>${value.adress}</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>${value.email}</td>
                        </tr>
                        <tr>
                            <td>Tên công ty:</td>
                            <td>${value.tenCty}</td>
                        </tr>
                        <tr>
                            <td>Giá trị hoá đơn:</td>
                            <td>${value.hoaDon}</td>
                        </tr>
                        <tr>
                            <td>Đánh giá</td>
                            <td>${value.danhGia()}</td>
                        </tr>
                    </tbody>
                   </table>
                `
            } else if (value.typeRole === 'employee') {
                getId('detailContent').innerHTML = `
                <table class="table table-borderless">
                    <tbody>
                        <tr>
                            <th>Tên người dùng:</th>
                            <th>${value.name}</th>
                        </tr>
                        <tr>
                            <td>Mã người dùng:</td>
                            <td>${value.maNd}</td>
                        </tr>
                        <tr>
                            <td>Địa chỉ:</td>
                            <td>${value.adress}</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>${value.email}</td>
                        </tr>
                        <tr>
                            <td>Số ngày làm:</td>
                            <td>${value.ngayLam}</td>
                        </tr>
                        <tr>
                            <td>Lương theo ngày:</td>
                            <td>${value.luongNgay}</td>
                        </tr>
                        <tr>
                            <td>Tổng lương</td>
                            <td>${value.tinhLuong()}</td>
                        </tr>
                    </tbody>
                   </table>
                `
            }
        }

    })
}



//-----------------------------------------MAIN--------------------------
getLocal()
renderListPerson()
