<?php
    include('config.php');
    $truyvan='SELECT * FROM "ds_hocsinh" ORDER BY "id"';
    $ds_hocsinh=pg_query($dbcon,$truyvan);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Quản lý dữ liệu</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</head>
<body>

<div class="container">
  <h2>Học sinh</h2>
  <p><a href="add.php">Thêm học sinh</a> | <input type="button" value="Thêm học sinh" onclick="window.location.href='add.php';"></p>
  <table class="table table-hover">
    <thead>
      <tr>
        <th>ID</th>
        <th>Tên</th>
        <th>Lớp</th>
        <th>Hành động</th>
      </tr>
    </thead>
    <tbody>
    <?php
        $i=1;
        while($kq=pg_fetch_assoc($ds_hocsinh)){
            echo '<tr>
                    <td>'.$i.'</td>
                    <td>'.$kq['ten'].'</td>
                    <td>'.$kq['lop'].'</td>
                    <td>
                        <a href="update.php?id='.$kq['id'].'">Sửa</a> | 
                        <a href="xuly.php?id='.$kq['id'].'&action=del">Xóa 1</a> | 
                        <a href="#" onclick="confirm_del('.$kq['id'].');">Xóa 2</a>
                    </td>
                </tr>';
            $i++;
        }
    ?>
    </tbody>
  </table>
</div>

<script>
function confirm_del(id) {
  var txt;
  var r = confirm("Bạn có chắc không?");
  if (r == true) {
    window.location.href = "xuly.php?id="+id+"&action=del";
  }
}
</script>

</body>
</html>
