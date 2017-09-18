<?php
/**
 * Created by PhpStorm.
 * User: bear
 * Date: 2017/5/26
 * Time: 22:31
 */

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Http\Response;


class ApiController extends Controller
{

    public function url(Request $request, Response $response)
    {

        $userId = $this->getUserId($request);
        if(empty($request->input("guest"))){ //不是guest
            if($userId==0||$userId==null||$userId==''||empty($userId)) return "";
        }


        return $this->apiService->exec($request,$userId);
    }
}