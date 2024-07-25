<?php
include 'db.php';

// 获取数据
$sql = "SELECT * FROM mytable";
$result = $conn->query($sql);

$data = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// 返回数据
header('Content-Type: application/json');
echo json_encode($data);

$conn->close();
?>