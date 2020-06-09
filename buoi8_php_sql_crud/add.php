<!DOCTYPE html>
<html lang="en">
<head>
  <title>Thêm học sinh</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</head>
<body>

<div class="container">
  <h2>Thêm học sinh</h2>
  <form action="xuly.php" method="GET">
    <!-- Nhập tên -->
    <div class="form-group">
      <label for="ten">Tên:</label>
      <input type="text" class="form-control" id="ten" placeholder="Nhập tên" name="ten">
    </div>

    <!-- Nhập lớp -->
    <div class="form-group">
      <label for="lop">Lớp:</label>
      <input type="text" class="form-control" id="lop" placeholder="Nhập lớp" name="lop">
    </div>

    <!-- Nhập tuổi -->
    <div class="form-group">
      <label for="tuoi">Tuổi:</label>
      <input type="number" class="form-control" id="tuoi" placeholder="Nhập tuổi" name="tuoi">
    </div>

    <!-- Nhập địa chỉ -->
    <div class="form-group">
      <label for="diachi">Địa chỉ:</label>
      <input type="text" class="form-control" id="diachi" placeholder="Nhập địa chỉ" name="diachi">
    </div>

    <!-- <button type="submit" class="btn btn-default">Lưu</button> -->

    <!-- <input type="button" value="Button"> -->
    <input type="reset" value="Xóa hết" class="btn btn-warning">
    <input type="submit" value="Lưu" class="btn btn-success" name="btn_luu">
  </form>
  <hr>
  <p><a href="view.php">Quay về</a></p>
</div>

</body>
</html>
