
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
            <td class="text-center">${value.maNd}</td>
            <td>${value.name}</td>
            <td>${value.mapTypeRole()}</td>
            <td>${value.adress}</td>
            <td>${value.email}</td>
            <td class="text-center"> <button class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#detailModal" onclick="detailNd('${value.maNd}')">Detail</button>
            <button class="btn btn-outline-secondary"  onclick="modalEditNd('${value.maNd}')" data-bs-toggle="modal"
            data-bs-target="#adminModal">Edit</button>
                <button class="btn btn-outline-danger" onclick="modalDeleteNd('${value.maNd}')">Delete</button>
                
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
    getId('personRole').disabled = false
    getId('editPerson').style.display = 'none'
    getId('adminForm').reset()
    getId('thongBao').innerHTML = 'Nhập thông tin chi tiết'
    getId('thongBao').style.display = 'none'
    getId('addPerson').style.display = 'inline-block'
    getId('maND').readOnly = false
    getElements('.tBao').forEach(value => value.style.display = 'none')

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


//----------------------VALIDATOR-------------------
const namePattern = /^[\p{L}\s']+$/u
const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const adressPattern = /^[\p{L}\d\s.,-]+$/u

const lengthTest = (idTest, idThongbao, min, messErr) => {
    let idTestValue = getId(idTest).value.trim()
    if (idTestValue.length <= min) {
        getId(idThongbao).style.display = 'block'
        getId(idThongbao).innerHTML = messErr
        return false
    } else {
        getId(idThongbao).style.display = 'none'
        return true
    }
}


const patternTest = (idTest, idThongbao, pattern, messErr) => {
    if (pattern.test(getId(idTest).value)) {
        getId(idThongbao).style.display = 'none'
        return true
    } else {
        getId(idThongbao).style.display = 'block'
        getId(idThongbao).innerHTML = messErr
        return false
    }
}


const nameTest = () => {
    let nameLenght = lengthTest('tenND', 'tbaoTen', 0, '*Không được bỏ trống')
    if (nameLenght) {
        let namePatternTest = patternTest('tenND', 'tbaoTen', namePattern, '*Tên chỉ bao gồm các kí tự chữ cái')
        if (namePatternTest) { return true } else return false
    } else return false
}

const emailTest = function () {
    let emailLenght = lengthTest('emailND', 'tbaoemail', 0, '*Không được bỏ trống')
    if (emailLenght) {
        let emailPatternTest = patternTest('emailND', 'tbaoemail', emailPattern, '*Email không đúng định dạng')
        if (emailPatternTest) {
            return true
        } else return false
    } else return false
}

const adressTest = function () {
    let adressLenght = lengthTest('adressND', 'tbaoAdress', 0, '*Không được bỏ trống')
    if (adressLenght) {
        let adressPatternTest = patternTest('adressND', 'tbaoAdress', adressPattern, '*Địa chỉ chỉ bao gồm chữ và số')
        if (adressPatternTest) {
            return true
        } else return false
    } else return false
}

const diemTest = function (idTest, idThongbao, messErr) {
    let diem = getId(idTest).value
    if (diem === '') {
        getId(idThongbao).style.display = 'block'
        getId(idThongbao).innerHTML = 'Vui lòng nhập điểm'
        return false
    } else {
        if (diem < 0 || diem > 10) {
            getId(idThongbao).style.display = 'block'
            getId(idThongbao).innerHTML = messErr
            return false
        } else {
            getId(idThongbao).style.display = 'none'
            return true
        }
    }

}

const ngayLamTest = function () {
    let ngayLam = getId('ngayLam').value
    if (ngayLam === '') {
        getId('tbaoNgaylam').style.display = 'block'
        getId('tbaoNgaylam').innerHTML = 'Vui lòng nhập số ngày làm'
        return false
    } else if (ngayLam < 0) {
        getId('tbaoNgaylam').style.display = 'block'
        getId('tbaoNgaylam').innerHTML = 'Ngày làm phải lớn hơn hoặc bằng 0'
        return false
    } else {
        getId('tbaoNgaylam').style.display = 'none'
        return true
    }
}

const luongNgayTest = function () {
    let luongNgay = getId('luongNgay').value
    if (luongNgay === '') {
        getId('tbaoLuongngay').style.display = 'block'
        getId('tbaoLuongngay').innerHTML = 'Vui lòng nhập lương mỗi ngày'
        return false
    } else if (luongNgay < 0 || luongNgay > 50000000) {
        getId('tbaoLuongngay').style.display = 'block'
        getId('tbaoLuongngay').innerHTML = 'Số lương phải từ 0 - 50.000.000'
        return false
    } else {
        getId('tbaoLuongngay').style.display = 'none'
        return true
    }
}

const tenCtyTest = () => {
    let tenCtyLength = lengthTest('tenCty', 'tbaoTencty', 0, '*Tên công ty không được bỏ trống')
    if (tenCtyLength) {
        let tenCtyPatternTest = patternTest('tenCty', 'tbaoTencty', adressPattern, '*Tên công ty chỉ bao gồm chữ và số')
        if (tenCtyPatternTest) {
            return true
        } else return false
    } else return false

}

const hoaDonTest = function () {
    let hoaDon = getId('giaHoadon').value
    if (hoaDon === '') {
        getId('tbaoHoadon').style.display = 'block'
        getId('tbaoHoadon').innerHTML = 'Vui lòng nhập Giá hoá đơn'
        return false
    } else if (hoaDon < 0 || hoaDon > 2000000000) {
        getId('tbaoHoadon').style.display = 'block'
        getId('tbaoHoadon').innerHTML = 'Giá trị hoá đơn phải từ 0 - 2.000.000.000'
        return false
    } else {
        getId('tbaoHoadon').style.display = 'none'
        return true
    }
}


const maNDTest = () => {
    let maNDLength = lengthTest('maND', 'tbaoMa', 0, 'Vui lòng nhập mã người dùng')
    // console.log(maNDLength);
    if (maNDLength) {
        let valueTest = getId('maND').value
        let trung = false
        listPerson.arrPerson.forEach(value => {
            if (value.maNd === valueTest) {
                trung = true
            }
        })
        if (trung) {
            getId('tbaoMa').style.display = 'block'
            getId('tbaoMa').innerHTML = 'Mã người dùng bị trùng. Vui lòng nhập mã khác'
            return false
        } else {
            getId('tbaoMa').style.display = 'none'
            return true
        }
    } else return false
}

//-------------------------------------------EDIT DATABASE FUNCTION --------
//Chức năng thêm người dùng
addPersonBtn.onclick = function () {
    if (btnType.value === 'student') {
        if (maNDTest() && nameTest() && adressTest() && emailTest() && diemTest('diemToan', 'tbaoToan', 'Điểm Toán phải từ 0 đến 10') && diemTest('diemLy', 'tbaoLy', 'Điểm Lý phải từ 0 đến 10') && diemTest('diemHoa', 'tbaoHoa', 'Điểm Hoá phải từ 0 đến 10')) {
            let newstudent = getInfoStudent()
            listPerson.addPerson(newstudent)
        }

    } else if (btnType.value === 'employee') {
        if (maNDTest() && nameTest() && adressTest() && emailTest() && luongNgayTest() && ngayLamTest()) {
            let employee = getInfoEmployee()
            listPerson.addPerson(employee)
        }

    } else if (btnType.value === 'customer') {
        if (maNDTest() && nameTest() && adressTest() && emailTest() && tenCtyTest() && hoaDonTest()) {
            let customer = getInfoCustomer()
            listPerson.addPerson(customer)
        }

    }
    setLocal()
    renderListPerson()
}


//popUp info người dùng
window.modalEditNd = function (maNd) {
    getElements('.tBao').forEach(value => value.style.display = 'none')
    getId('personRole').disabled = true
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
                if (nameTest() && adressTest() && emailTest() && diemTest('diemToan', 'tbaoToan', 'Điểm Toán phải từ 0 đến 10') && diemTest('diemLy', 'tbaoLy', 'Điểm Lý phải từ 0 đến 10') && diemTest('diemHoa', 'tbaoHoa', 'Điểm Hoá phải từ 0 đến 10')) {
                    let editPerson = getInfoStudent()
                    listPerson.arrPerson.splice(index, 1, editPerson)
                    setLocal()
                    renderListPerson()
                }

            } else if (value.typeRole === 'customer') {
                if (maNDTest() && nameTest() && adressTest() && emailTest() && tenCtyTest() && hoaDonTest()) {
                    let editPerson = getInfoCustomer()
                    listPerson.arrPerson.splice(index, 1, editPerson)
                    setLocal()
                    renderListPerson()
                }

            } else if (value.typeRole === 'employee') {
                if (maNDTest() && nameTest() && adressTest() && emailTest() && luongNgayTest() && ngayLamTest()) {
                    let editPerson = getInfoEmployee()
                    listPerson.arrPerson.splice(index, 1, editPerson)
                    setLocal()
                    renderListPerson()
                }

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
    // console.log(arrSorted);
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
    } else renderListPerson()
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
                        <tr class="border-bottom">
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
                        <tr class="border-bottom">
                            <td>Điểm hoá:</td>
                            <td>${value.diemHoa}</td>
                        </tr>
                        <tr>
                            <td class="fw-bold">Điểm trung bình:</td>
                            <td class="fw-bold">${value.diemTrungBinh().toFixed(2)}</td>
                        </tr>
                    </tbody>
                   </table>
                `
            } else if (value.typeRole === 'customer') {
                let danhGia = value.danhGia()
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
                        <tr class="border-bottom">
                            <td>Email:</td>
                            <td>${value.email}</td>
                        </tr>
                        <tr>
                            <td>Tên công ty:</td>
                            <td>${value.tenCty}</td>
                        </tr>
                        <tr class="border-bottom">
                            <td>Giá trị hoá đơn:</td>
                            <td>${value.hoaDon}</td>
                        </tr>
                        <tr>
                            <td class="fw-bold">Đánh giá:</td>
                            <td class="fw-bold">${danhGia}</td>
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
                        <tr class="border-bottom">
                            <td>Email:</td>
                            <td>${value.email}</td>
                        </tr>
                        <tr>
                            <td>Số ngày làm:</td>
                            <td>${value.ngayLam}</td>
                        </tr>
                        <tr class="border-bottom">
                            <td>Lương theo ngày:</td>
                            <td>${value.luongNgay}</td>
                        </tr>
                        <tr>
                            <td class="fw-bold">Tổng lương:</td>
                            <td class="fw-bold">${value.tinhLuong()}</td>
                        </tr>
                    </tbody>
                   </table>
                `
            }
        }

    })
}




//--------------------------SEARCH THEO TÊN---------------
let inputSearch = getId('searchPerson')
inputSearch.addEventListener('keyup', () => {
    let valueSearch = inputSearch.value.replace(/\s/g, '').toUpperCase()
    let arrSearch = []
    for (let i = 0; i < listPerson.arrPerson.length; i++) {
        if (valueSearch === '') {
            renderListPerson()
        } else {
            let person = listPerson.arrPerson[i]
            let personName = person.name.replace(/\s/g, '').toUpperCase()
            if (personName.indexOf(valueSearch) !== -1) {
                arrSearch.push(person)
                renderListPerson(arrSearch)
            }
        }
    }

})


//---------------------RUNTIME VALIDATION----------------
getId('maND').onblur = function () {
    maNDTest()
}
getId('tenND').onblur = function () {
    nameTest()
}
getId('emailND').onblur = function () {
    emailTest()
}
getId('adressND').onblur = () => {
    adressTest()
}
getId('diemToan').onblur = () => {
    diemTest('diemToan', 'tbaoToan', 'Điểm Toán phải từ 0 đến 10')
}
getId('diemLy').onblur = () => {
    diemTest('diemLy', 'tbaoLy', 'Điểm Lý phải từ 0 đến 10')
}
getId('diemHoa').onblur = () => {
    diemTest('diemHoa', 'tbaoHoa', 'Điểm Hoá phải từ 0 đến 10')
}
getId('ngayLam').onblur = () => {
    ngayLamTest()
}
getId('luongNgay').onblur = () => {
    luongNgayTest()
}
getId('tenCty').onblur = () => {
    tenCtyTest()
}
getId('giaHoadon').onblur = () => {
    hoaDonTest()
}
//-----------------------------------------MAIN--------------------------
getLocal()
renderListPerson()


