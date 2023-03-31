

var arrNhanVien = [];

document.querySelector('#btnThemNV').onclick = function(){
    var nhanVien = new NhanVien();
    
    nhanVien.taiKhoan = document.querySelector('#tknv').value;
    nhanVien.tenNhanVien = document.querySelector('#name').value;
    nhanVien.email = document.querySelector('#email').value;
    nhanVien.datepicker = document.querySelector('#datepicker').value;
    nhanVien.luongCB = +document.querySelector('#luongCB').value;
    nhanVien.chucvu = document.querySelector('#chucvu').value;
    nhanVien.gioLam = +document.querySelector('#gioLam').value;
    nhanVien.password = document.querySelector('#password').value;
    arrNhanVien.push(nhanVien);
    console.log(nhanVien.gioLam);
    console.log(nhanVien.luongCB);
    var valid = true;

    // kiem tra rong
    valid = valid & kiemTraRong(nhanVien.taiKhoan, 'taiKhoan')&kiemTraRong(nhanVien.tenNhanVien, 'tenNhanVien')&kiemTraRong(nhanVien.email, 'Email')&kiemTraRong(nhanVien.password, 'Password')
    &kiemTraRong(nhanVien.datepicker, 'NgayLam') & kiemTraRong(nhanVien.luongCB, 'LuongCoBan') & kiemtraChucVu(nhanVien.chucvu, 'ChucVu') & kiemTraRong(nhanVien.gioLam, 'GioLam');
    
    // dinh dang email + chu +  so + password
    
    valid = valid & kiemTraEmail(nhanVien.email, 'Email') & kiemTraKyTu(nhanVien.tenNhanVien, 'tenNhanVien') & kiemTraSo(nhanVien.luongCB, 'LuongCoBan') 
    & kiemTraSo(nhanVien.gioLam, 'GioLam') &kiemTraPassword(nhanVien.password, 'Password', 6,10);
    // kiem tra dieu kien (do dai range)
    valid = valid & kiemTraDoDai(nhanVien.taiKhoan, 'taiKhoan', 4,6) 
    & kiemTraRange(nhanVien.luongCB, 'LuongCoBan',1e+6, 20e+6) & kiemTraRange(nhanVien.gioLam, 'GioLam',80,200);
    
    if(!valid){
        return;
    }
    renderNhanVien(arrNhanVien);
    saveStorage(arrNhanVien);
    document.querySelector('form').reset();

}

function renderNhanVien(arrNV){
    var htmlContent = '';

    for(var index= 0; index<arrNV.length; index++){
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
                <td><button class="btn btn-danger mx-2" onclick="xoaNhanVienTheoMa('${nhanVienNew.taiKhoan}')">Xoá</button></td>
            </tr>
        `;
        
    }
    document.querySelector('#tableDanhSach').innerHTML = htmlContent;
    return htmlContent;
}


function xoaNhanVienTheoMa(taiKhoan){
    console.log(taiKhoan);
    var indexDel = -1;
    for(var index= 0; index<arrNhanVien.length; index++){
        var nhanVien = arrNhanVien[index];
        if(taiKhoan === nhanVien.taiKhoan){
            indexDel = index;
        }
    }

    if(indexDel != -1){
        arrNhanVien.splice(indexDel, 1);
        renderNhanVien(arrNhanVien);
    }

    saveStorage(arrNhanVien);
}



getStorage();
renderNhanVien(arrNhanVien);