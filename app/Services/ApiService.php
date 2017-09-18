<?php


namespace App\Services;


use Illuminate\Http\Request;

class ApiService
{
    private $API_URL;

    public function __construct()
    {
        $this->API_URL = env("API_URL_HOST") . "/" . env("API_VERSION");
    }

    public function exec(Request $request, $userId)
    {
        $method = $request->getMethod();
        $url = $request->getRequestUri();
        $url = substr($url, 4);
        $url = urldecode($url);

        $useridkeys = ['userId', 'uid'];
        foreach ($useridkeys as $key) {
            $url = str_replace("{" . $key . "}", $userId, $url);
            $url = str_replace("[" . $key . "]", $userId, $url);
            $url = str_replace("_userId_", $userId, $url);
        }
        $url = $this->API_URL . $url;



        $header = $this->getTokenHeader();


        //处理参数
        $data = $request->input();
        unset($data[$request->getRequestUri()]);
        //处理userId
        foreach ($data as $key => &$item) {
            if ($key == "userId") {
                $item = $userId;
            }
        }
        if ($method == "GET") {
            return $this->geturl($url, $header);
        } elseif ($method == "POST") {
            return $this->posturl($url, $data, $header);
        } elseif ($method == "PUT") {
            return $this->puturl($url, $data, $header);
        } elseif ($method == "DELETE") {
            return $this->delurl($url,$data,  $header);
        }
        return $this->geturl($url, $header);
    }
    function login($uid=0){
        $url = $this->API_URL . "/user/set/login/time/".$uid;
        $header = $this->getTokenHeader();
        $this->posturl($url, array(), $header);
    }

    function geturl($url,$headerArray)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headerArray);
        $output = curl_exec($ch);
        curl_close($ch);
//        $output = json_decode($output, true);
        return $output;
    }


    function posturl($url, $data,$headerArray)
    {
        $data = json_encode($data);
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headerArray);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $output = curl_exec($curl);
        curl_close($curl);
        return $output;// json_decode($output,true);
    }
  function puturl($url,$data,$headerArray){
        $data = json_encode($data);
      $ch = curl_init(); //初始化CURL句柄
     curl_setopt($ch, CURLOPT_URL, $url); //设置请求的URL
      curl_setopt ($ch, CURLOPT_HTTPHEADER, $headerArray);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER,1); //设为TRUE把curl_exec()结果转化为字串，而不是直接输出
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST,"PUT"); //设置请求方式
     curl_setopt($ch, CURLOPT_POSTFIELDS, $data);//设置提交的字符串
     $output = curl_exec($ch);
     curl_close($ch);
     return $output;
//     return json_decode($output,true);
  }

    function delurl($url, $data,$headerArray)
    {
        $data = json_encode($data);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headerArray);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        $output = curl_exec($ch);
        curl_close($ch);
        return $output;
       // return json_decode($output, true);
    }

    public function execFull(Request $request, $userId, $url, $method, $data = null)
    {
        $url = urldecode($url);
        //
        $useridkeys = ['userId', 'uid'];
        foreach ($useridkeys as $key) {
            $url = str_replace("{" . $key . "}", $userId, $url);
            $url = str_replace("[" . $key . "]", $userId, $url);
            $url = str_replace("_userId_", $userId, $url);
        }
        $url = $this->API_URL . $url;
         $header = $this->getTokenHeader();

        if ($method == "GET") {
            return $this->geturl($url, $header);
        } elseif ($method == "POST") {
            return $this->posturl($url, $data, $header);
        } elseif ($method == "PUT") {
            return $this->puturl($url, $data, $header);
        } elseif ($method == "DELETE") {
            return $this->delurl($url,$data,  $header);
        }
        return $this->geturl($url, $header);
    }

    public function getTokenHeader()
    {
        $timestamp = time();
        $nonceStr = $this->randCode(3, 10);
        $token = md5(env("APP_KEY") . $nonceStr . $timestamp . env("APP_KEY"));
        return array("Content-type:application/json","timestamp:" . $timestamp, "noncestr:".$nonceStr, "token:".$token);
    }

    private function randCode($what, $number)
    {
        $string = '';
        for ($i = 1; $i <= $number; $i++) {
//混合
            $panduan = 1;
            if ($what == 3) {
                if (rand(1, 2) == 1) {
                    $what = 1;
                } else {
                    $what = 2;
                }
                $panduan = 2;
            }

//数字
            if ($what == 1) {
                $string .= rand(0, 9);
            } elseif ($what == 2) {
//字母
                $rand = rand(0, 24);
                $b = 'a';
                for ($a = 0; $a <= $rand; $a++) {
                    $b++;
                }
                $string .= $b;
            }
            if ($panduan == 2) $what = 3;
        }
        return $string;
    }
}