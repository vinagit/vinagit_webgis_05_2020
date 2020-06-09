<?php
    include('config.php');

    if(isset($_GET['ten']) and isset($_GET['lop']) and isset($_GET['tuoi']) and isset($_GET['diachi']) and isset($_GET['btn_luu'])){
        //Thêm mới

        $ten=$_GET['ten'];
        $lop=$_GET['lop'];
        $tuoi=$_GET['tuoi'];
        $diachi=$_GET['diachi'];

        $truyvan='INSERT INTO "ds_hocsinh" ("ten", "lop", "tuoi", "diachi")
        VALUES (\''.$ten.'\', \''.$lop.'\', \''.$tuoi.'\', \''.$diachi.'\');';
        
        $thucthi=pg_query($dbcon,$truyvan);

        //Chuyển về trang view danh sách
        header("Location: view.php");
    }elseif(isset($_GET['id']) and isset($_GET['ten']) and isset($_GET['lop']) and isset($_GET['tuoi']) and isset($_GET['diachi']) and isset($_GET['btn_capnhat'])){
        //Cập nhật
        
        $id=$_GET['id'];
        $ten=$_GET['ten'];
        $lop=$_GET['lop'];
        $tuoi=$_GET['tuoi'];
        $diachi=$_GET['diachi'];

        $truyvan='UPDATE "ds_hocsinh" SET
        "ten" = \''.$ten.'\',
        "lop" = \''.$lop.'\',
        "tuoi" = \''.$tuoi.'\',
        "diachi" = \''.$diachi.'\'
        WHERE "id" = \''.$id.'\';';

        $thucthi=pg_query($dbcon,$truyvan);

        //Chuyển về trang view danh sách
        header("Location: view.php");
        
    }else if(isset($_GET['id']) and isset($_GET['action'])){
       if($_GET['action']=='del'){
            $id=$_GET['id'];

            $truyvan='DELETE FROM "ds_hocsinh"
            WHERE "id" = \''.$id.'\';';
            $thucthi=pg_query($dbcon,$truyvan);

            //Chuyển về trang view danh sách
            header("Location: view.php");
       }
    }else{
        echo 'Bạn không có quyền truy cập!';
    }
    

    
?>