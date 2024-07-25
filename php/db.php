<?php
$servername = "MySQL:3306";
$username = "root";
$password = "";
$dbname = "demo";

// 创建数据库连接
$conn = new mysqli($servername, $username, $password, $dbname);

// 检查连接
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>