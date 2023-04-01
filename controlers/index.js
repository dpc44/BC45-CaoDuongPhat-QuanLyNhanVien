

var arrNhanVien = [];

document.querySelector('#btnThemNV').onclick = function () {
    var nhanVien = new NhanVien();

    nhanVien.taiKhoan = document.querySelector('#tknv').value;
    nhanVien.tenNhanVien = document.querySelector('#name').value;
    nhanVien.email = document.querySelector('#email').value;
    nhanVien.datepicker = document.querySelector('#datepicker').value;
    nhanVien.luongCB = +document.querySelector('#luongCB').value;
    nhanVien.chucvu = document.querySelector('#chucvu').value;
    nhanVien.gioLam = +document.querySelector('#gioLam').value;
    nhanVien.password = document.querySelector('#password').value;
    var valid = validationForm(nhanVien);
    if (!valid) {
        return;
    }
    arrNhanVien.push(nhanVien);
    renderNhanVien(arrNhanVien);
    saveStorage(arrNhanVien);
    document.querySelector('form').reset();

}
function validationForm(nhanVien){
    var valid = true;
    console.log("validationFormm = ", nhanVien);
    // kiem tra rong
    valid = valid & kiemTraRong(nhanVien.taiKhoan, 'taiKhoan') & kiemTraRong(nhanVien.tenNhanVien, 'tenNhanVien') & kiemTraRong(nhanVien.email, 'Email') & kiemTraRong(nhanVien.password, 'Password')
        & kiemTraRong(nhanVien.datepicker, 'NgayLam') & kiemtraChucVu(nhanVien.chucvu, 'ChucVu');

    // dinh dang email + chu +  so + password

    valid = valid & kiemTraEmail(nhanVien.email, 'Email') & kiemTraKyTu(nhanVien.tenNhanVien, 'tenNhanVien') & kiemTraSo(nhanVien.luongCB, 'LuongCoBan')
        & kiemTraSo(nhanVien.gioLam, 'GioLam') & kiemTraPassword(nhanVien.password, 'Password', 6, 10);
    // kiem tra dieu kien (do dai range)
    valid = valid & kiemTraDoDai(nhanVien.taiKhoan, 'taiKhoan', 4, 6)
        & kiemTraRange(nhanVien.luongCB, 'LuongCoBan', 1e+6, 20e+6) & kiemTraRange(nhanVien.gioLam, 'GioLam', 80, 200);
    //kiem tra date
    valid = valid & kiemTraDate(nhanVien.datepicker, 'NgayLam');
    return valid;
}
function renderNhanVien(arrNV) {
    var htmlContent = '';

    for (var index = 0; index < arrNV.length; index++) {
        var nhanVien = arrNV[index];
        var nhanVienNew = new NhanVien();
        Object.assign(nhanVienNew, nhanVien);
        htmlContent +=
            `
            <tr>
                <td> ${nhanVienNew.taiKhoan} </td>
                <td> ${nhanVienNew.tenNhanVien} </td>
                <td> ${nhanVienNew.email} </td>
                <td> ${nhanVienNew.datepicker} </td>
                <td> ${nhanVienNew.chucvu} </td>
                <td> ${nhanVienNew.tongLuong()} </td>
                <td> ${nhanVienNew.xepLoai()} </td>
                <td class="btn-group" role="group">
                    <button class="btn btn-danger mx-1 d-inline" onclick="xoaNhanVienTheoMa('${nhanVienNew.taiKhoan}')">Xoá</button>
                    <button class="btn btn-success mx-1 d-inline" onclick="editNhanVien('${nhanVienNew.taiKhoan}')" data-toggle="modal"
                    data-target="#myModal">Edit</button>
                </td>

            </tr>
        `;

    }
    document.querySelector('#tableDanhSach').innerHTML = htmlContent;
    return htmlContent;
}


function xoaNhanVienTheoMa(taiKhoan) {
    console.log(taiKhoan);
    
    var indexDel = -1;
    for (var index = 0; index < arrNhanVien.length; index++) {
        var nhanVien = arrNhanVien[index];
        if (taiKhoan === nhanVien.taiKhoan) {
            indexDel = index;
        }
    }

    if (indexDel != -1) {
        arrNhanVien.splice(indexDel, 1);
        renderNhanVien(arrNhanVien);
    }

    saveStorage(arrNhanVien);
}


function editNhanVien(taiKhoan1) {
    console.log(taiKhoan1);
    // console.log(arrNhanVien);
    var indexEdit = -1;
    
    for (var index = 0; index < arrNhanVien.length; index++) {
        var nhanVien = arrNhanVien[index];
        
        if (nhanVien.taiKhoan == taiKhoan1) {
            
            indexEdit = index;
            break;
        }
    }
    if (indexEdit != 1) {

        document.querySelector('#tknv').value = arrNhanVien[indexEdit].taiKhoan;
        document.querySelector('#name').value = arrNhanVien[indexEdit].tenNhanVien;
        document.querySelector('#email').value = arrNhanVien[indexEdit].email;
        document.querySelector('#datepicker').value = arrNhanVien[indexEdit].datepicker;
        document.querySelector('#luongCB').value = arrNhanVien[indexEdit].luongCB;
        document.querySelector('#chucvu').value = arrNhanVien[indexEdit].chucvu;
        document.querySelector('#gioLam').value = arrNhanVien[indexEdit].gioLam;
        document.querySelector('#password').value = arrNhanVien[indexEdit].password;
        document.querySelector('#tknv').disabled = true;
        document.querySelector('#btnThemNV').disabled = true;
    }
}

document.querySelector('#btnDong').onclick = function () {
    document.querySelector('#tknv').disabled = false;
    document.querySelector('#btnThemNV').disabled = false;
    document.querySelector('form').reset();
}

document.querySelector('#btnCapNhat').onclick = function () {
    var nhanVienEdit = new NhanVien();
    nhanVienEdit.taiKhoan = document.querySelector('#tknv').value;
    nhanVienEdit.tenNhanVien = document.querySelector('#name').value;
    nhanVienEdit.email = document.querySelector('#email').value;
    nhanVienEdit.datepicker = document.querySelector('#datepicker').value;
    nhanVienEdit.luongCB = +document.querySelector('#luongCB').value;
    nhanVienEdit.chucvu = document.querySelector('#chucvu').value;
    nhanVienEdit.gioLam = +document.querySelector('#gioLam').value;
    nhanVienEdit.password = document.querySelector('#password').value;
    var valid;
    console.log('arrNhanVien.length = ', arrNhanVien.length);
    for (var index = 0; index < arrNhanVien.length; index++) {
        var nhanVien = arrNhanVien[index];
        if (nhanVien.taiKhoan === nhanVienEdit.taiKhoan) {
            
            nhanVien.taiKhoan = nhanVienEdit.taiKhoan;
            nhanVien.tenNhanVien = nhanVienEdit.tenNhanVien;
            nhanVien.email = nhanVienEdit.email;
            nhanVien.datepicker = nhanVienEdit.datepicker;
            nhanVien.luongCB = nhanVienEdit.luongCB;
            nhanVien.chucvu = nhanVienEdit.chucvu;
            nhanVien.gioLam = nhanVienEdit.gioLam ;
            nhanVien.password = nhanVienEdit.password;
            valid = validationForm(nhanVien);
            break
        }
        
    }

    if(!valid){
        return;
    }
    renderNhanVien(arrNhanVien);
    saveStorage(arrNhanVien);
    document.querySelector('#tknv').disabled = false;
    document.querySelector('#btnThemNV').disabled = false;
    document.querySelector('form').reset();
    
}

document.querySelector('#searchName').oninput = function (){
    var tuKhoa = document.querySelector('#searchName').value.trim();
    tuKhoa = stringToSlug(tuKhoa);
    console.log(tuKhoa);

    var arrXepLoaiNV =[];
    for (var index = 0; index < arrNhanVien.length; index++) {
        var nhanVien = arrNhanVien[index];
        var nhanVienNew = new NhanVien();
        Object.assign(nhanVienNew, nhanVien);
        if (stringToSlug(nhanVienNew.xepLoai().trim()).search(tuKhoa) !== -1) {
            arrXepLoaiNV.push(nhanVienNew);
        }
    }
    renderNhanVien(arrXepLoaiNV)
}

















getStorage();
renderNhanVien(arrNhanVien);