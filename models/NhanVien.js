function NhanVien(){
    this.taiKhoan = '';
    this.tenNhanVien = '';
    this.email='';
    this.password = '';
    this.datepicker = '';
    this.luongCB = 0;
    this.chucvu = '';
    this.gioLam=0;
    this.xepLoai = ''
    this.tongLuong = function(){
        var tongLuong = 0;
        if(this.chucvu === 'Sếp'){
            tongLuong = this.luongCB *3;
        }else if(this.chucvu === 'Trưởng phòng'){
            tongLuong = this.luongCB *2;
        }else{
            tongLuong = this.luongCB;
        }
        return tongLuong;
    }


    this.xepLoai = function(){
        var xepLoai = '';
        if(this.gioLam >= 192){
            xepLoai = 'Xuất Sắc';
        }
        else if(this.gioLam >= 176 && this.gioLam <192){
            xepLoai = 'Giỏi';
        }
        else if(this.gioLam >= 160 && this.gioLam <176){
            xepLoai = 'Khá';
        }else{
            xepLoai = 'Trung Bình';
        }
        return xepLoai;
    }
}