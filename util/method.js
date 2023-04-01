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

function stringToSlug(title) { 
    //Đổi chữ hoa thành chữ thường
    slug = title.toLowerCase();

    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    //Xóa các ký tự đặt biệt
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, "-");
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');

    return slug;
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

function kiemTraDate(value,name){
    var regexDate =/(0\d{1}|1[0-2])\/([0-2]\d{1}|3[0-1])\/(19|20)(\d{2})/;
    if(regexDate.test(value)){
        document.querySelector(`#error-regex-${name}`).innerHTML = '';
        return true;
    }
    document.querySelector(`#error-regex-${name}`).innerHTML = `${name} không hợp lệ ! định dạng mm/dd/yyyy`;
    return false;

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