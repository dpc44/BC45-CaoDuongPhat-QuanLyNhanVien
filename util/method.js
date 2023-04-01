// Local storage
function saveStorage(arrNhanVien) {
    //B1: Xác định được dữ liệu cần lưu là arr,object hay string,bool,number
    var sArrNhanVien = JSON.stringify(arrNhanVien); //Biến đổi arrNhanVien => chuỗi
    console.log(sArrNhanVien);
    //B2: Đem string arrNhanVien vào localstorage lưu trữ
    localStorage.setItem('arrNhanVien', sArrNhanVien);
}

function getStorage() {

    if (localStorage.getItem('arrNhanVien')) {
        var stringArrNhanVien = localStorage.getItem('arrNhanVien');
        arrNhanVien = JSON.parse(stringArrNhanVien);
        console.log('arrNhanVien Local storage: ', arrNhanVien);
    }
}



// Validation

function kiemTraRong(value,name){
    
    if(value.trim() === '') {
        document.querySelector(`#error-required-${name}`).innerHTML = `${name} không được bỏ trống !`;
        return false;
    }
    
    
    document.querySelector(`#error-required-${name}`).innerHTML = '';
    return true;
}

function kiemtraChucVu(value,name){
    if(value.trim() === '') {
        document.querySelector(`#error-required-${name}`).innerHTML = `${name} không không hợp lệ !`
        return false;
    }
    document.querySelector(`#error-required-${name}`).innerHTML = '';
    return true;
}


function kiemTraEmail(value,name){
    var regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(regexEmail.test(value)){
        document.querySelector(`#error-regex-${name}`).innerHTML = '';
        return true;
    }
    document.querySelector(`#error-regex-${name}`).innerHTML = `${name} không hợp lệ !`;
    return false;

}

function kiemTraSo(value,name){
    var regexNumber =/^[0-9]+$/;
    if(regexNumber.test(value)){
        document.querySelector(`#error-regex-${name}`).innerHTML = '';
        return true;
    }
    document.querySelector(`#error-regex-${name}`).innerHTML = `${name} không hợp lệ !`;
    return false;

}

function kiemTraKyTu(value,name){
    var regexLetter =/^[A-Z a-z]+$/;
    if(regexLetter.test(value)){
        document.querySelector(`#error-regex-${name}`).innerHTML = '';
        return true;
    }
    document.querySelector(`#error-regex-${name}`).innerHTML = `${name} không hợp lệ !`;
    return false;

}


function kiemTraPassword(value,name, minLength, maxLength){
    
    var regexPassword =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{2,}$/;
    if(value.trim().length < minLength || value.trim().length>maxLength){
        document.querySelector(`#error-regex-${name}`).innerHTML = `${name} không hợp lệ ! độ dài từ ${minLength} - ${maxLength}`;
        return false;
    }
    else{
        if(regexPassword.test(value)){
            document.querySelector(`#error-regex-${name}`).innerHTML = '';
            return true;
        }
        document.querySelector(`#error-regex-${name}`).innerHTML = `${name} không hợp lệ ! chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt`;
        return false;
    }
    
}

function kiemTraDoDai(value,name,minLength,maxLength) {

    if(value.trim().length < minLength || value.trim().length>maxLength) {
        document.querySelector(`#error-length-${name}`).innerHTML = `${name} từ ${minLength} - ${maxLength} ký tự !`;
        return false;
    }
    document.querySelector(`#error-length-${name}`).innerHTML = ``;
    return true;

}

function kiemTraRange(value,name, minValue, maxValue){
    if(value<minValue || value > maxValue){
        document.querySelector(`#error-length-${name}`).innerHTML = `${name} từ ${minValue} - ${maxValue} !`;
        return false;
    }
    document.querySelector(`#error-length-${name}`).innerHTML = ``;
    return true;
}