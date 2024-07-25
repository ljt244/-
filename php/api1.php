<?php
header("Access-Control-Allow-Origin: http://localhost:8082");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Max-Age: 86400');
    exit;
}
// 引用之前创建的 config.php 文件
require_once 'config1.php';

// 获取前端传递过来的数据
message=message = message=_POST['message'];

// 在数据库中插入数据
sql="INSERTINTOmessages(message)VALUES(′sql = "INSERT INTO messages (message) VALUES ('sql="INSERTINTOmessages(message)VALUES(′message')";
if (conn−>query(conn->query(conn−>query(sql) === TRUE) {
    echo "新记录插入成功";
} else {
    echo "Error: " . sql."<br>".sql . "<br>" . sql."<br>".conn->error;
}

// 关闭连接
$conn->close();
?>