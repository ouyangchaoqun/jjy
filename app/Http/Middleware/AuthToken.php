<?php
/**
 * Created by PhpStorm.
 * User: pc
 * Date: 2017/5/10
 * Time: 14:45
 */

namespace App\Http\Middleware;

use App\Models\UserModel;
use Closure;

class AuthToken
{
    public function handle($request, Closure $next)
    {
        return $next($request);
        $pram = $request->input();
        if(!isset($pram['api_token'])) exit("token_empty");
        $get_token  = $pram['api_token'];
        unset($pram['api_token']);

        $token = $this->generateMd5Sign($pram);

        if ($token == $get_token) {
            return $next($request);
        } else {
            echo "token_error";
        }
    }

    /**
     * md5方式签名
     * @param  array $params 待签名参数
     * @return string
     */
    protected function generateMd5Sign($params)
    {
        ksort($params);

        $tmps = array();
        foreach ($params as $k => $v) {
            $tmps[] = $k . $v;
        }

        $string = env('APP_KEY') . implode('', $tmps) . env('APP_KEY');
        print_r($string.'|');
        print_r(strtoupper(md5($string)));

        return strtoupper(md5($string));
    }
}