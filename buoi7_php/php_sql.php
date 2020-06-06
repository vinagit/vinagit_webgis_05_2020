<?php
    include('config.php');

    //Select    
    $truyvan='SELECT * FROM "duynghia_quangnam" LIMIT 5';
    $thucthi=pg_query($dbcon,$truyvan);

    //Ghi kết quả ra màn hình
    echo '<table border=1>';
    echo '<tr>';
    echo '<td><b>Tên</b></td>';
    echo '<td><b>Số tờ</b></td>';
    echo '<td><b>Số thừa</b></td>';
    echo '<td><b>Địa chỉ</b></td>';
    echo '</tr>';
    while($kq=pg_fetch_assoc($thucthi)){
        echo '<tr>';
        echo '<td>'.$kq['tenchusdd'].'</td>';
        echo '<td>'.$kq['shbando'].'</td>';
        echo '<td>'.$kq['shthua'].'</td>';
        echo '<td>'.$kq['diachi'].'</td>';
        echo '</tr>';
    }
    echo '</table>';

    echo '<hr>';

    //Ví dụ gen selectbox từ danh sách mã sử dụng đất trong DB
    $truyvan='SELECT distinct(mdsd) as sudungdat
    FROM "duynghia_quangnam"';
    $thucthi=pg_query($dbcon,$truyvan);

    echo '<select>';
    while($kq=pg_fetch_assoc($thucthi)){
        echo '<option value="'.$kq['sudungdat'].'">'.$kq['sudungdat'].'</option>';
    }
    echo '</select>';
?>