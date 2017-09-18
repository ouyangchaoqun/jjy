<?php


namespace App\Http\Middleware;


use App\Http\MyRequest;
use App\Libraries\ResponseLibrary;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Response;

/**登录
 * Class AuthUser
 * @package App\Http\Middleware
 */
class AuthUser
{
    private $request;
    private $userlogunkey = 'x_u_i';

    public function handle(Request $request, Closure $next)
    {
        $this->request = $request;
        if (!$this->checkLogin()) {
            return $this->validFail();
        }
        return $next($this->request);
    }

    private function validFail()
    {
        $message = '请先登录';
        if ($this->request->ajax()) {
            return ResponseLibrary::jsonFail(0, $message);
        }
        return $message;
    }

    private function checkLogin()
    {


        $cookie = Cookie::get($this->userlogunkey);
        if (isset($cookie) && !empty($cookie)) {}
        else{
            //测试用
            $cookie = Crypt::encrypt(\json_encode(array('id'=>370)));
            //return false;
        }
        if (isset($cookie) && !empty($cookie)) {
            try {
                $decrypted = Crypt::decrypt($cookie);
                $user = \json_decode($decrypted);
                MyRequest::setUser($this->request,$user);
                //$this->request->attributes->add(array('loginuser'=>$user));
                return true;
            } catch (DecryptException $e) {
                //
            }
        }
        return false;
    }
}