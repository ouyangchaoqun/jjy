<?php
namespace App\Libraries;
/**
 * Created by PhpStorm.
 * User: bear
 * Date: 2017/5/12
 * Time: 12:09
 */
class ResponseLibrary
{
    public  static function jsonSuccess($data=null){
        return json_encode(array("status"=>1,"data"=>$data));
    }

    public  static function jsonFail($status=-1,$msg="失败",$data=null){
        return json_encode(array("status"=>$status,"msg"=>$msg,"data"=>$data));
    }

}