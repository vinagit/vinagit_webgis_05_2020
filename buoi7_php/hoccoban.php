<?php
    /* echo '<h1>Đây là mã php</h1>';
    echo '<script>alert(123);</script>'; */

    //Tạo biến
    $ten='Nguyễn Văn A';
    $tuoi=4;

    $ds_mau=['màu đỏ','màu vàng','màu xanh'];
    echo count($ds_mau);
    echo '<br>';
    echo $ds_mau[1];
    echo '<hr>';

    echo '<b>Tên</b>: '.$ten;
    echo '<br>';
    echo '<b>Tuổi</b>: '.$tuoi;

    echo '<hr>';

    //+,-,*,/
    //echo $tuoi+5;

    //Điều kiện
    //<,<=,>,>=,==,!=
    if($tuoi<4){
        echo 'Tuổi bé hơn 4';
    }elseif($tuoi==4){
        echo 'Tuổi bằng 4';
    }else{
        echo 'Tuổi lớn hơn 4';
    }

    echo '<hr>';

    //Vòng lặp
    /* for($i=1;$i<=100;$i++){
        echo $i.'<br>';
    } */

    echo '<ol>';
    for($i=0;$i<count($ds_mau);$i++){
        //echo $ds_mau[$i].'<br>';
        echo '<li>'.$ds_mau[$i].'</li>';
    }
    echo '</ol>';

    //gen selectbox
    echo '<hr>';

    echo '<select>';
    for($i=0;$i<count($ds_mau);$i++){
        echo '<option value="'.$ds_mau[$i].'">'.$ds_mau[$i].'</option>';
    }
    echo '</select>';

    //Tạo hàm
    echo '<hr>';
    function greeting($ten,$tuoi){
        echo 'Xin chào bạn <b>'.$ten.'</b>, tuổi của bạn là: '.$tuoi;
    }

    function tinhtuoi($namsinh){
        $current_year=date("Y");
        $tuoi=$current_year-$namsinh;
        return $tuoi;
    }

    greeting('Phạm Thị C',21);
    echo '<br>';

    $ten2='Thái Văn A';
    $namsinh2=1995;
    greeting($ten2,tinhtuoi($namsinh2));
    echo '<br>';

    //echo tinhtuoi(1991);

    //Hàm gen selectbox từ mảng
    echo '<hr>';

    function gen_selectbox($arr){
        echo '<select>';
        for($i=0;$i<count($arr);$i++){
            echo '<option value="'.$arr[$i].'">'.$arr[$i].'</option>';
        }
        echo '</select>';
    }

    gen_selectbox($ds_mau);

    $tinhthanh_arr=['Hà Nội','Vinh','Huế','Hồ Chí Minh','Cần Thơ'];
    gen_selectbox($tinhthanh_arr);

    


?>