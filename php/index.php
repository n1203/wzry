<?php

header("Access-Control-Allow-Origin: *"); // 允许任意域名发起的跨域请求
/**
 * 获取PDF文件页数的函数获取
 * 文件应当对当前用户可读（linux下）
 * @param  [string] $path [文件路径]
 * @return [array]        [数组第一位表示成功与否，第二位表示提示信息]
 */

// $path= $_GET['filePath'];
$path= $_GET['filePath'];
$id= $_GET['id'];
// $path= $_FILES["file"]["tmp_name"];
function getPdfPages($path){
    if(!file_exists($path)) return array(false,"文件\"{$path}\"不存在！");
    if(!is_readable($path)) return array(false,"文件\"{$path}\"不可读！");
    // 打开文件
    $fp=@fopen($path,"r");
    if (!$fp) {
        return array(false,"打开文件\"{$path}\"失败");
    }else {
        $max=0;
        while(!feof($fp)) {
            $line = fgets($fp,255);
            if (preg_match('/\/Count [0-9]+/', $line, $matches)){
                preg_match('/[0-9]+/',$matches[0], $matches2);
                if ($max<$matches2[0]) $max=$matches2[0];
            }
        }
        fclose($fp);
        // 返回页数
        return array(true,$max);
    }
}
    /**
     * 测试代码
     */
    $results=getPdfPages($path);



    if($results[1]){
        // 允许跨域访问
         $con = mysqli_connect("47.100.101.232","KDprint","KDprint","KDprint");
        if (mysqli_connect_errno($con))
        {
          echo "连接 MySQL 失败: " . mysqli_connect_error();
        }
        mysqli_query($con,"UPDATE File_order SET page= ".$results[1]." WHERE id= ".$id);
        mysqli_close($con);
        header('Content-Type:application/json; charset=utf-8');
        $json = array('code'=>'200','path'=>$path,'state'=>$results[0],'pages'=>$results[1]);
        return exit(json_encode($json));
    }else{
        echo '失败';
    }

?>